import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../supports/ApiUrl";
import { Table } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaCentercode } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import { HargaTotal, HeaderNumberMinus } from "../redux/actions/";

const MySwal = withReactContent(Swal);
class Cart extends Component {
  state = {
    isicart: [],
    toCheckout: false
  };

  componentDidMount() {
    this.getdata();
  }

  getdata = () => {
    Axios.get(
      `${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`
    )
      .then(res => {
        console.log(res.data[0]);
        // console.log(res)
        // console.log(res.data[0].transactiondetails)
        var newarrforprod = [];
        res.data[0].transactiondetails.forEach(element => {
          newarrforprod.push(
            Axios.get(`${API_URL}/products/${element.productId}`)
          );
        });
        // console.log(newarrforprod)
        Axios.all(newarrforprod).then(res2 => {
          // console.log(res2)
          res2.forEach((val, index) => {
            res.data[0].transactiondetails[index].dataprod = val.data;
          });
          console.log(res.data[0].transactiondetails);
          this.setState({ isicart: res.data[0].transactiondetails });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkOut = () => {};

  renderisidata = () => {
    return this.state.isicart.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.dataprod.name}</td>
          <td>
            <img src={val.dataprod.image} height="200" alt="" />
          </td>
          <td>{val.qty}</td>
          <td>{val.dataprod.harga}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteconfirm(index, val.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  deleteconfirm = (index, id) => {
    MySwal.fire({
      title: `Are you sure wanna delete ${this.state.isicart[index].dataprod.name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Axios.delete(`${API_URL}/transactiondetails/${id}`)
          .then(res => {
            this.props.HeaderNumberMinus();
            MySwal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then(result => {
              if (result.value) {
                this.getdata();
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  totalHarga = () => {
    let hargatotal = 0;
    this.state.isicart.forEach(val => {
      hargatotal += val.dataprod.harga;
    });
    return hargatotal;
  };
  tombolCheckout = () => {
    MySwal.fire({
      title: `Are you sure wanna checkout  ?`,
      text: `Total belanja anda : ${this.totalHarga()}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(res => {
      if (res.value) {
        this.props.HargaTotal(this.totalHarga());
        this.setState({ toCheckout: true });
      }
    });
  };

  render() {
    return (
      <div className="paddingatas">
        <Table striped>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>foto</th>
              <th>qty</th>
              <th>Harga</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>{this.renderisidata()}</tbody>
        </Table>{" "}
        <div
          className="checkout"
          style={{ fontSize: 25, display: "flex", justifyContent: "center" }}
        >
          Total belanjaan anda sebanyak :{this.totalHarga()}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={this.tombolCheckout}>
            Checkout
          </button>
        </div>
        {this.state.toCheckout ? <Redirect to="/checkoutpage" /> : null}
      </div>
    );
  }
}
const MapstatetoProps = state => {
  return {
    User: state.Auth
  };
};
export default connect(MapstatetoProps, { HargaTotal, HeaderNumberMinus })(
  Cart
);
