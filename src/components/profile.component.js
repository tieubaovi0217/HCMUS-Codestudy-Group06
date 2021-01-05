import React, {Component} from 'react';
import ProfileItem from './profile.item.component.js';
import ProfileSetting from './profile.setting.component.js';
import pic from '../pictures/logo_transparent.png';
import ratingLogo from '../pictures/rating.png';
import emailLogo from '../pictures/email_logo.png';
import '../css/profile.component.css';
import {Button} from "@material-ui/core";
import axios from "axios";

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page : 0,
            usernamefake: localStorage.getItem("username"),
            isLoggedIn: localStorage.getItem("isLoggedIn")
        };
        this.toProfilePage = this.toProfilePage.bind(this);
        this.toSettingPage = this.toSettingPage.bind(this);
        this.preCal = this.preCal.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
    }

    emailHandler(email) {
        this.setState({
            email: email
        });
    }

    preCal() {
        const cur = new Date();
        const joined = new Date(this.state.joined);
        var date1 = cur.getTime();
        var date2 = joined.getTime();
        var res = '';
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 365)
            if (Math.floor(diffDays / 365) === 1)
                res = 'a year ago';
            else
                res = Math.floor(diffDays / 365) + ' years ago';
        else if (diffDays > 30)
            if (Math.floor(diffDays / 30) === 1)
                res = 'a month ago';
            else
                res = Math.floor(diffDays / 30) + ' months ago';
        else if (diffDays != 0)
            if (diffDays === 1)
                res = 'a day ago';
            else
                res = diffDays + ' days ago';
        else
            res = 'today';
        // console.log(res);

        const {rating} = this.state;
        var color = 'black'
        if (rating < 100)
            color = 'gray';
        else if (rating < 200)
            color = 'blue';
        else if (rating < 300)
            color = 'purple';
        else if (rating < 400)
            color = 'orange';
        else
            color = 'red';
        this.setState({
            register: res,
            color: color
        });
    }

    componentDidMount() {
        if (this.state.isLoggedIn)
        {
            axios
            .get(`http://localhost:5000/users/profile/${this.state.usernamefake}`)
            .then((response) => {
                let {username, email, rating, joined} = response.data[0];
                // console.log(response.data[0]);
                //console.log(username);
                //username=localStorage.getItem("username");
                //email=username + "@fit.hcmus.edu.vn";
                this.setState({
                    username: username,
                    email: email,
                    rating: rating,
                    joined: joined
                })
                this.preCal();
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

    toProfilePage() {
        this.setState(
            {page: 0}
        )
    }

    toSettingPage() {
        this.setState(
            {page: 1}
        )
    }

    render() {
        let {isLoggedIn} = this.state;
        if (isLoggedIn)
            return (
                <div className='Profile'>
                    <div className='NavigateButton'>
                        <Button onClick={this.toProfilePage}>
                            PROFILE
                        </Button>
                        <Button onClick={this.toSettingPage}>
                            SETTING
                        </Button>
                    </div>
                    {this.state.page == 0 && <div className='ProfileInfor'>
                        <div className='ProfileInformation'>
                            <h1 className='Username' style={{
                                color: this.state.color
                            }}>
                                {this.state.username}
                            </h1>
                            <br/>
                            <ProfileItem
                                image={ratingLogo}
                                title='Contest rating:'
                                content={this.state.rating}
                                contentColor={this.state.color}
                                fontWeight='bold'
                            />
                            <ProfileItem
                                image={emailLogo}
                                title='Email:'
                                content={this.state.email}
                            />
                            <ProfileItem
                                title='Registered:'
                                content={this.state.register}
                                contentColor='gray'
                            />
                        </div>
                        {/* <div className='ProfilePicture'>
                            <img src = {pic}/>
                            <br/>
                            <p>
                                Change photo
                            </p>
                        </div> */}
                    </div>}
                    {this.state.page == 1 && <ProfileSetting
                        username={this.state.username}
                        email={this.state.email}
                        emailHandler={this.emailHandler}
                    />}
                </div>
            );
        else
            return(
                <p> Please log in to View your profile</p>
            );
    }
}