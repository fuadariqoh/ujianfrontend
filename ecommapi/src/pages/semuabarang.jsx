import React, { Component } from "react";
import Axios from "axios";
import { API_URL } from "../supports/ApiUrl";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import Numeral from "numeral";
import { FaCartPlus } from "react-icons/fa";

class Semuabarang extends Component {
  state = {
    products: [],
    categories: "",
    keyword: ""
  };

  componentDidMount() {
    Axios.get(`${API_URL}/products?_expand=kategori`).then(res => {
      this.setState({ products: res.data });
      console.log(this.state.products);
    });
  }
  onChangeSearch = e => {
    this.setState({ keyword: e.target.value });
  };

  renderProducts = () => {
    const { keyword } = this.state;
    var code = this.state.products.name;

    if (keyword !== "" && this.state.products.indexOf(keyword) === -1) {
      return null;
    }
    return this.state.products.map((val, index) => {
      return (
        <div key={index} className="p-3" style={{ width: "20%" }}>
          <Card>
            <div style={{ height: 300, width: "100%" }}>
              <img src={val.image} height="100%" width="100%" alt="" />
              <div className="kotakhitam">
                <Link to={`/productdetail/${val.id}`} className="tombolebuynow">
                  <button className="tomboldalam">
                    <FaCartPlus />
                  </button>
                </Link>
              </div>
            </div>
            <CardBody style={{ height: 150 }}>
              <CardTitle style={{ fontWeight: "bold" }} className="mb-2">
                {val.name}
              </CardTitle>
              <CardSubtitle className="mb-2">
                {"Rp." + Numeral(val.harga).format(0.0)}
              </CardSubtitle>
              <button disabled className="rounded-pill px-2 btn-primary">
                {val.kategori.nama}
              </button>
            </CardBody>
          </Card>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="paddingatas">
        <h1>Semua Barang</h1>
        <input
          type="text"
          defaultValue={this.state.keyword}
          onChange={this.onChangeSearch}
        />
        <button>Cari</button>
        <div>
          <button>Mainan</button>
          <button>Pakaian</button>
          <button>Elektronik</button>
        </div>

        <div className="d-flex">{this.renderProducts()}</div>
      </div>
    );
  }
}

export default Semuabarang;
