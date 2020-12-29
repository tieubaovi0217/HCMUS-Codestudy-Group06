import React, {Component} from 'react';
import ProfileItem from './profile.item.component.js';
import pic from '../pictures/logo_transparent.png';
import '../css/profile.component.css';
import {Button} from "@material-ui/core";
import axios from "axios";

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page : 0
        }
        this.user = {}

        this.toProfilePage = this.toProfilePage.bind(this)
        this.toSettingPage = this.toSettingPage.bind(this)
    }

    componentDidMount() {
        axios
        .get('http://localhost:5000/users')
        .then((response) => {
            let {username, email} = response.data[0];
            console.log(username);
            console.log("HELLO");
            this.setState({
                username: username,
                email: email
            })
        })
        .catch(function (error) {
            console.log(error);
        })
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
        return (
            // Your code goes here, must included in a <div>
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
                        <h1 className='Title'>
                            Master
                        </h1>
                        <h1 className='Username'>
                            {this.state.username}
                        </h1>
                        <br/>
                        <ProfileItem
                            title='Contest rating:'
                            content='1111'
                            contentColor='blue'
                            fontWeight='bold'
                        />
                        <ProfileItem
                            title='Email:'
                            content={this.state.email}
                        />
                        <ProfileItem
                            title='Last visit:'
                            content='Online now'
                            contentColor='green'
                        />
                        <ProfileItem
                            title='Registered:'
                            content='last month'
                            contentColor='gray'
                        />
                    </div>
                    <div className='ProfilePicture'>
                        <img src = {pic}/>
                        <br/>
                        <p>
                            Change photo
                        </p>
                    </div>
                </div>}
                {this.state.page == 1 && <div className='ProfileSetting'>
                    <p> Nothing here yet!</p>
                </div>}
            </div>
        );
    }
}