import React, { Component } from "react";
import { Table } from "reactstrap";
import { FaThumbsDown } from "react-icons/fa";
import Cart from "./Cart";
import { connect } from "react-redux";
import {
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";

class Checkout extends Component {
  state = {
    photos: ['"./image/bca.jpg'],
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      console.log(this.props.User.hargaTotal);
      const then = moment("03 18 2020, 08:00 am", "MM DD YYYY, h:mm a");
      const now = moment();
      const countdown = moment(then - now);
      const days = countdown.format("D");
      const hours = countdown.format("HH");
      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");

      this.setState({ days, hours, minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onClick;
  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div className="checkoutBox">
        <ButtonGroup vertical>
          <h1>Total yang harus dibayar :</h1>
          <h2>{this.props.User.hargaTotal}</h2>
          <Link to="/banktransfer">
            <Button>Bank Transfer</Button>
          </Link>

          <Link to="/kartukredit">
            <Button>Kartu Kredit</Button>
          </Link>

          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle disabled style={{ color: "black" }}>
              Waktu anda untuk membayar : {hours} Jam {minutes} menit {seconds}{" "}
              detik
            </DropdownToggle>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    );
  }
}
const MapstatetoProps = state => {
  return {
    User: state.Auth
  };
};

export default connect(MapstatetoProps)(Checkout);
