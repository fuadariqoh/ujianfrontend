import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import { connect } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { BukanHome, IniHome, Logout } from "./../redux/actions";
import MySwal from "sweetalert2";
import { API_URL } from "../supports/ApiUrl";
import Axios from "axios";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

class NavbarPage extends Component {
  state = {
    isOpen: false,
    searchBar: ""
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  Logout = () => {
    MySwal.fire({
      title: `Are you sure wanna logout ${this.props.User.username} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      console.log(result);
      if (result.value) {
        this.props.Logout();
        localStorage.removeItem("iduser");
      }
    });
  };

  onTypeSearch = e => {
    this.setState({ searchBar: e.target.value });
    console.log(this.state.searchBar);
  };
  onSubmitSearch = () => {
    console.log("tes");
  };

  //           .then(res => {
  //             MySwal.fire(
  //               "Deleted!",
  //               "Your file has been deleted.",
  //               "success"
  //             ).then(result => {
  //               if (result.value) {
  //                 this.getdata();
  //               }
  //             });
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       }
  //     });
  //   };

  render() {
    console.log(this.props.Header);
    return (
      <MDBNavbar
        color="teal"
        transparent={this.props.Header}
        scrolling
        className="bordernav"
        dark
        fixed="top"
        expand="md"
      >
        <MDBNavbarBrand href="/">
          <div className="headerlogo">
            <div>
              <FaApple />
            </div>
            <div className="textlogo"> ZORO</div>
          </div>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav tag="div" right className="mr-5">
            <MDBNavItem>
              {this.props.User.role === "admin" &&
              this.props.User.islogin == true ? (
                <MDBNavLink to="/manageadmin">manage Admin</MDBNavLink>
              ) : null}
            </MDBNavItem>
            <MDBNavItem>
              {this.props.User.role === "admin" &&
              this.props.User.islogin == true ? (
                <MDBNavLink to="/managetransaksi">manage transaksi</MDBNavLink>
              ) : null}
            </MDBNavItem>
            {this.props.User.islogin && this.props.User.role === "user" ? (
              <MDBNavItem>
                {this.props.User.totalBarang}

                <MDBNavLink to="/cart">
                  <FiShoppingCart style={{ fontSize: 20 }} /> Cart
                </MDBNavLink>
              </MDBNavItem>
            ) : null}
            <MDBNavItem>
              {this.props.User.islogin ? null : (
                <MDBNavLink to="/login">Login/Register</MDBNavLink>
              )}
            </MDBNavItem>

            <MDBNavItem>
              {this.props.User.islogin ? (
                <MDBDropdown>
                  <MDBDropdownToggle nav className="warnanav">
                    <FaUserCircle /> hallo, {this.props.User.username}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown1">
                    <Link to="/">
                      <MDBDropdownItem onClick={this.Logout}>
                        Logout
                      </MDBDropdownItem>
                    </Link>
                    <Link to="/changepassword">
                      <MDBDropdownItem>Change Password</MDBDropdownItem>
                    </Link>
                    {/* <MDBDropdownItem href="#!"></MDBDropdownItem> */}
                    {/* <MDBDropdownItem href="#!">Something else here</MDBDropdownItem> */}
                  </MDBDropdownMenu>
                </MDBDropdown>
              ) : null}
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

const MapstatetoProps = state => {
  return {
    User: state.Auth,
    Header: state.Header.ishome
  };
};

export default connect(MapstatetoProps, { IniHome, BukanHome, Logout })(
  NavbarPage
);
