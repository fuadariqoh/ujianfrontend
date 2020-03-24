import React, { Component } from "react";
import Axios from "axios";
import { API_URL } from "../supports/ApiUrl";
import { connect } from "react-redux";

class Kartukredit extends Component {
  state = {
    KreditNumber: ""
  };

  onChangeKredit = e => {
    this.setState({ KreditNumber: e.target.value });
  };

  onClickKredit = () => {
    Axios.get(`${API_URL}/transactions?_embed=transactiondetails`).then(res => {
      let object = {
        status: "pending",
        userId: this.props.User.id
      };
      Axios.put(
        `${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}`,
        object
      ).then(res => {
        console.log(res);
      });
    });
  };

  render() {
    return (
      <div className="paddingatas">
        Masukkan Nomor Kredit Anda
        <input type="text" onChange={this.onChangeKredit} />
        <button onClick={this.onClickKredit}>Submit</button>
      </div>
    );
  }
}

const MapstatetoProps = state => {
  return {
    User: state.Auth
  };
};

export default connect(MapstatetoProps)(Kartukredit);
