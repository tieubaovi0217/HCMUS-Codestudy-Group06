import React, { Component } from "react";
import "../css/profile.setting.component.css";
import { Button } from "@material-ui/core";
import axios from "axios";

export default class ProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: this.props.email,
      oldPass: "",
      newPass: "",
      CnewPass: "",
      error: "OK",
    };

    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  submit() {
    let username = this.props.username;
    let oldPassword = this.state.oldPass;
    let newPassword = this.state.newPass;
    let CnewPassword = this.state.CnewPass;
    if (newPassword === "") {
      newPassword = this.state.oldPass;
      CnewPassword = newPassword;
    }
    let email = this.state.emailInput;
    axios
      .post(
        `http://localhost:5000/users/profile/update/${this.props.username}`,
        {
          username,
          oldPassword,
          newPassword,
          CnewPassword,
          email,
        }
      )
      .then((response) => {
        console.log(response.data);
        let msg = response.data;
        if (msg === "OK") {
          this.setState({
            emailInput: email,
            oldPass: "",
            newPass: "",
            CnewPass: "",
            error: "Successfully updated",
            errorColor: "green",
          });
          var emailHandler = this.props.emailHandler;
          emailHandler(email);
        } else
          this.setState({
            error: msg,
            errorColor: null,
          });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { errorColor } = this.state;
    return (
      <div className="ProfileSetting">
        <div className="InputInfor">
          <p>Email</p>
          <input
            name="emailInput"
            onChange={this.handleChange}
            type="text"
            value={this.state.emailInput}
          />
        </div>
        <div className="InputInfor">
          <p>Old password</p>
          <input
            name="oldPass"
            onChange={this.handleChange}
            type="password"
            value={this.state.oldPass}
          />
        </div>
        <div className="InputInfor">
          <p>New password</p>
          <input
            name="newPass"
            onChange={this.handleChange}
            type="password"
            value={this.state.newPass}
          />
        </div>
        <div className="Msg">
          <p>Leave it blank if you do not want to change the password</p>
        </div>
        <div className="InputInfor">
          <p>Confirm new password</p>
          <input
            name="CnewPass"
            onChange={this.handleChange}
            type="password"
            value={this.state.CnewPass}
          />
        </div>
        <div className="Hahaha">
          <Button type="submit" onClick={this.submit}>
            Save changes
          </Button>
          {this.state.error != "OK" && (
            <p
              className="ErrorHandle"
              style={{
                color: errorColor,
              }}
            >
              {this.state.error}
            </p>
          )}
        </div>
      </div>
    );
  }
}
