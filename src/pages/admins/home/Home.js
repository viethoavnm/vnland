import React, { Component } from "react";
import "../styles/Admin.scss";
import SearchBox from "../../../components/commons/searchBox/SearchBox";
import Dropdown from "../../../components/commons/dropdown/Dropdown";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      listHome: [],
      selectedProvince: null,
      listProvince: [
        "Hà Nội",
        "Sài Gòn",
        "Đà Nẵng"
      ],
      selectedDistrict: null,
      listDistrict: [
        "Quận 1",
        "Quận 2"
      ],
      selectedWard: null,
      listWard: [
        "Phường",
        "Xã",
        "Huyền"
      ]
    }
  }

  handleSearch = () => {
    alert("Should do search: " + this.state.searchText);
  }

  onChangeSearch = (value) => {
    this.setState({
      searchText: value
    })
  }

  onSelectProvince = (item) => {
    this.setState({
      selectedProvince: item
    })
  }

  onSelectDistrict = (item) => {
    this.setState({
      selectedDistrict: item
    })
  }

  onSelectWard = (item) => {
    this.setState({
      selectedWard: item
    })
  }

  render() {
    const {
      searchText,
      listHome,
      selectedProvince,
      listProvince,
      selectedDistrict,
      listDistrict,
      selectedWard,
      listWard
    } = this.state;
    return (
      <div className="admin-container">
        <div className="title-row">
          <div className="title-admin-page">Home</div>
          <SearchBox placeholder="Search" value={searchText} onChangeSearch={this.onChangeSearch} onSearch={this.handleSearch} />
        </div>

        <div className="actions-row">
          <Dropdown title="Select province" listDropdown={listProvince} selected={selectedProvince} onSelect={this.onSelectProvince} />
          <Dropdown title="Select district" listDropdown={listDistrict} selected={selectedDistrict} onSelect={this.onSelectDistrict} />
          <Dropdown title="Select ward" listDropdown={listWard} selected={selectedWard} onSelect={this.onSelectWard} />
          <button type="button" className="btn btn-add-new">Add new</button>
        </div>
      </div>
    );
  }
}
export default Home;