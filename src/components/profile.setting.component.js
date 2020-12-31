import React, {Component} from 'react';
import '../css/profile.setting.component.css';
import {Button} from "@material-ui/core";
import axios from 'axios';

export default class ProfileSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInput: this.props.email,
            curPass: this.props.password,
            oldPass: '',
            newPass: '',
            CnewPass: '',
            error: 'OK'
        }

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkValid = this.checkValid.bind(this);
    }

    handleChange(event) {
        var {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    checkValid() {
        if (this.state.oldPass != this.state.curPass)
            return 'Invalid current password';
        if (this.state.newPass.length > 0 && this.state.newPass.length < 5)
            return 'New password should contain at least 5 character';
        if (this.state.newPass != this.state.CnewPass)
            return 'Confirmation mismatched';
        return 'OK';
    }
    
    submit(){
        var msg = this.checkValid();
        this.setState({
            error: msg,
            errorColor: null
        });
        if (msg != 'OK') return;
        let username = this.props.username;
        let password = this.state.newPass;
        if (password === '') password = this.state.oldPass;
        let email = this.state.emailInput;
        axios.post(`http://localhost:5000/users/profile/update/${this.props.username}`, {
            username,
            password,
            email
        })
        .then(response => {
            console.log(response.data);
            password = response.data.password;
            email = response.data.email;
        })
        .catch((error) => console.log(error));
        this.setState({
            emailInput: email,
            curPass: password,
            oldPass: '',
            newPass: '',
            CnewPass: '',
            error: 'Successfully updated',
            errorColor: 'green'
        })
    }

    render() {
        const {errorColor} = this.state;
        return (
            <div className='ProfileSetting'>
                <div className='InputInfor'>
                    <p>Email</p>
                    <input name='emailInput' onChange={this.handleChange} type='text' value={this.state.emailInput}/>
                </div>
                <div className='InputInfor'>
                    <p>Old password</p>
                    <input name='oldPass' onChange={this.handleChange} type='password' value={this.state.oldPass}/>
                </div>
                <div className='InputInfor'>
                    <p>New password</p>
                    <input name='newPass' onChange={this.handleChange} type='password' value={this.state.newPass}/>
                </div>
                <div className='Msg'>
                    <p>Leave it blank if you do not want to change the password</p>
                </div>
                <div className='InputInfor'>
                    <p>Confirm new password</p>
                    <input name='CnewPass' onChange={this.handleChange} type='password' value={this.state.CnewPass}/>
                </div>
                <div className='Hahaha'>
                    <Button type="submit" onClick={this.submit}>
                            Save changes
                    </Button>
                    {this.state.error != 'OK' && 
                    <p className='ErrorHandle' style={{
                        color: errorColor}
                    }>{this.state.error}</p>}
                </div>
            </div>
        );
    }
}