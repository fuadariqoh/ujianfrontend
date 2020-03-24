import React, { Component } from "react";
import "../App.css";
import { MDBBtn, MDBAlert } from "mdbreact";
import Axios from "axios";
import { connect } from "react-redux";
import { API_URL } from "../supports/ApiUrl";

class Changepassword extends Component {
  state = {
    password: "",
    newpassword: "",
    newverifypassword: "",
    emptyinput: false,
    notmatchpassword: false,
    oldpasswordsalah: false
  };

  onChangeOldPassword = e => {
    this.setState({ password: e.target.value });
    console.log(this.state.password);
  };
  onChangeNewPassword = e => {
    this.setState({ newpassword: e.target.value });
    console.log(this.state.newpassword);
  };
  onChangeNewVerifyPassword = e => {
    this.setState({ newverifypassword: e.target.value });
    console.log(this.state.newverifypassword);
  };

  onSubmitChange = () => {
    let oldpassword = this.state.password;
    let newpassword = this.state.newpassword;
    let newverifypassword = this.state.newverifypassword;

    if (oldpassword === "" || newpassword === "" || newverifypassword === "") {
      this.setState({ emptyinput: true });
    } else if (newpassword !== newverifypassword) {
      this.setState({ notmatchpassword: true });
    } else {
      console.log(this.props.User.id);
      Axios.get(
        `${API_URL}/users?password=${oldpassword}&id=${this.props.User.id}`
      ).then(res => {
        if (res.data.length === 0) {
          this.setState({ oldpasswordsalah: true });
        } else {
          console.log(res.data[0].username);
          var object = {
            username: res.data[0].username,
            password: newpassword,
            role: "user",
            id: this.props.User.id
          };
          Axios.put(
            `http://localhost:3000/users/${this.props.User.id}`,
            object
          ).then(res => {
            console.log(res);
          });
        }
      });
    }
  };

  clearEmptyinput = () => {
    this.setState({ emptyinput: false });
  };
  clearnotmatchinput = () => {
    this.setState({ notmatchpassword: false });
  };
  clearoldpassword = () => {
    this.setState({ oldpasswordsalah: false });
  };
  render() {
    return (
      <form onSubmit={this.onSubmitChange}>
        <div className="paddingatas">
          <h1>Change Password</h1>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Old Password</label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput"
              name="oldpassword"
              onChange={this.onChangeOldPassword}
              defaultValue={this.state.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">New Password</label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput"
              name="newpassword"
              defaultValue={this.state.newpassword}
              onChange={this.onChangeNewPassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">New Verify Password</label>
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput"
              name="newverifypassword"
              onChange={this.onChangeNewVerifyPassword}
              defaultValue={this.state.newverifypassword}
            />
          </div>{" "}
          {this.state.notmatchpassword ? (
            <div>
              <MDBAlert color="danger">
                Terjadi kesalahan pada input password baru anda{" "}
                <span
                  className="float-right hovererr font-weight-bold"
                  onClick={this.clearnotmatchinput}
                >
                  X
                </span>
              </MDBAlert>
            </div>
          ) : null}
          {this.state.emptyinput ? (
            <div>
              <MDBAlert color="danger">
                Input anda kosong bos!{" "}
                <span
                  className="float-right hovererr font-weight-bold"
                  onClick={this.clearEmptyinput}
                >
                  X
                </span>
              </MDBAlert>
            </div>
          ) : null}{" "}
          {this.state.oldpasswordsalah ? (
            <div>
              <MDBAlert color="danger">
                Old password anda salah!{" "}
                <span
                  className="float-right hovererr font-weight-bold"
                  onClick={this.clearoldpassword}
                >
                  X
                </span>
              </MDBAlert>
            </div>
          ) : null}
          <div className="d-flex justify-content-center">
            <MDBBtn gradient="blue" onClick={this.onSubmitChange}>
              Submit
            </MDBBtn>
          </div>
        </div>
      </form>
    );
  }
}

const MapstatetoProps = state => {
  return {
    User: state.Auth
  };
};

export default connect(MapstatetoProps)(Changepassword);
