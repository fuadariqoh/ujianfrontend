import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "sweetalert2";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBAlert
} from "mdbreact";
import Axios from "axios";
import { API_URL } from "../supports/ApiUrl";
import { Redirect } from "react-router-dom";
import MySwal from "sweetalert2";

class Register extends Component {
  state = {
    username: "",
    password: "",
    verifypassword: "",
    passwordfalse: false,
    tologinPage: false
  };
  onChangeUsername = e => {
    this.setState({ username: e.target.value });
    console.log(this.state.username);
  };
  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };
  onChangeVerifyPassword = e => {
    this.setState({ verifypassword: e.target.value });
  };

  // verifypasswordchangxse = e => {
  //   this.setState({ verifypassword: e.verifypasswordchange.value });
  // };

  onClickRegister = () => {
    var username = this.state.username;
    var password = this.state.password;
    var verifypassword = this.state.verifypassword;
    var role = "user";

    if (username === "" || password === "" || verifypassword === "") {
      MySwal.fire("Salah satu input anda kosong");
    } else if (password !== verifypassword) {
      this.setState({ passwordfalse: true });
    } else {
      Axios.get(`${API_URL}/users?username=${username}`).then(res => {
        if (res.data.length === 0) {
          MySwal.fire(
            "Registrasi anda berhasil,anda akan dialihkan ke menu login"
          );
          var newuser = { username, password, role };
          Axios.post(`${API_URL}/users`, newuser).then(res => {
            this.setState({ tologinPage: true });
          });
        } else {
          MySwal.fire("Username yang anda masukkan telah dipakai!");
        }
      });
    }

    // e.preventDefault();
    // var username = this.refs.usernameinput.value;
    // var password = this.refs.firstpassword.value;
    // var verifypassword = this.refs.secondpassword.value;
    // var role = "user";

    // var newUser = { username, password, role };
    // console.log(newUser);
    // if (username === "" || password === "" || verifypassword === "") {
    //   this.setState({ passwordfalse: true });
    // }
  };
  clearPass = () => {
    this.setState({ passwordfalse: false });
  };
  render() {
    return (
      <div className="registerBox">
        {this.state.tologinPage ? <Redirect to="/login" /> : null}
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form onSubmit={this.onClickRegister}>
                <p className="h5 text-center mb-4">Sign up</p>
                <div className="grey-text">
                  <div>
                    <MDBInput
                      label="Your name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.onChangeUsername}
                      valueDefault={this.state.username}
                    />
                  </div>
                  <div>
                    <MDBInput
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      onChange={this.onChangePassword}
                      valueDefault={this.state.password}
                    />
                  </div>
                  <div>
                    <MDBInput
                      label="Verify password"
                      icon="lock"
                      group
                      type="password"
                      onChange={this.onChangeVerifyPassword}
                      valueDefault={this.state.verifypassword}
                      validate
                    />
                  </div>
                </div>
                <div className="text-center">
                  {this.state.passwordfalse ? (
                    <MDBAlert color="danger">
                      Password Atau Username anda salah
                      <span
                        className="float-right hovererr font-weight-bold"
                        onClick={this.clearPass}
                      >
                        X
                      </span>
                    </MDBAlert>
                  ) : null}
                  <MDBBtn color="primary" onClick={this.onClickRegister}>
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.Auth;
};

export default connect(mapStateToProps)(Register);
