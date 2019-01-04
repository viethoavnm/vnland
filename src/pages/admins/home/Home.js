import React, { Component } from "react";
import { connect } from 'react-redux';
import "../styles/Admin.scss";
import "./Home.scss";
import SearchBox from "../../../components/commons/searchBox/SearchBox";
import Dropdown from "../../../components/commons/dropdown/Dropdown";
import * as HomeServices from "./HomeServices";
import DataTable from "../../../components/commons/dataTable/DataTable";
import ic_add_images from "../../../public/images/icons/ic_add-images.png";
import * as LocationService from "../../../services/LocationService";
import { success, error, showModal } from "../../../actions";

class Home extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      homeName: "",
      homeDescription: "",
      location: {},
      media: {},
      homeStatus: 0,

      searchText: "",
      selectedHome: [],
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
  componentDidMount() {
    this.getListHome();
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  getListHome = () => {
    HomeServices.getListHome(response => {
      if (response.status === 200) {
        let data = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = {
            Id: response.data[i].id,
            Title: response.data[i].homeName,
            Description: response.data[i].homeDescription,
            Status: response.data[i].homeStatus ? "True" : "False"
          }
          data.push(item);
        }
        if (this._isMounted) {
          this.setState({
            listHome: data
          })
        }
      }
    }, error => {
      console.log(error);
    })
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
  onSelectItem = (value, checked) => {
    let state = this.state;
    if (value === "ALL") {
      if (checked) {
        state.selectedHome = state.listHome;
      } else {
        state.selectedHome = []
      }
    } else {
      state.selectedHome = state.selectedHome.filter(item => item.id !== state.listHome[value].id);
      if (checked) {
        state.selectedHome.push(state.listHome[value]);
      }
    }
    this.setState(state);
  }

  onHandleView = () => { }
  onHandleCheckout = () => { }
  onHandleCheckin = () => { }
  onHandleEdit = () => { }
  onHandleDelete = (home) => {
    if (home) {
      this.props.showModal("Do you want delete  " + home.Title + " ?", confirm => {
        HomeServices.deleteHome(home.Id, response => {
          if (response.status === 200) {
            this.props.success("Delete successful");
            this.getListHome();
          } else {
            this.props.error("Something were wrong!")
          }
        })
      }, error => {
        this.props.error(error);
      })
    }
  }
  handleAddHome = () => {
    if (this.formValidate()) {
      const data = {
        homeName: this.state.homeName,
        homeDescription: this.state.homeDescription,
        location: this.state.location,
        media: this.state.media,
      }
      HomeServices.createHome(data, response => {
        if (response.status === 200) {
          this.props.success("Add home successfully!")
          this.getListHome();
        } else {
          this.props.error("Something were wrong!");
        }
      }, error => {
        this.props.error(error);
      })
    }
    $('#add-new-home').modal('toggle');
  }

  formValidate = () => {
    const state = this.state;
    let check = state.homeName !== "" && state.homeDescription !== "";
    this.setState({
      isValid: check
    });
    return check;
  };

  onChangeData = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  render() {
    const {
      isValid,
      homeName,
      homeDescription,
      location,
      media,
      homeStatus,
      searchText,
      selectedHome,
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
          <button type="button" className="btn btn-add-new" data-toggle="modal" data-target="#add-new-home">Add new</button>
        </div>

        <DataTable id="home-data-table" selected={selectedHome} data={listHome} onSelect={this.onSelectItem}
          action={true} onHandleView={this.onHandleView} onHandleCheckin={this.onHandleCheckin}
          onHandleCheckout={this.onHandleCheckout} onHandleEdit={this.onHandleEdit} onHandleDelete={this.onHandleDelete} />

        <div className="modal fade" id="add-new-home" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog add-home-modal" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create New Home</h5>
              </div>
              <div className="modal-body">
                <div className="modal-row">
                  <div className="add-modal-title">Title</div>
                  <input className="form-control" name="homeName" value={homeName} type="text"
                    onChange={(e) => this.onChangeData(e.target.name, e.target.value)} />
                  {!isValid && homeName === '' && <span className="help-block">Field is required</span>}
                </div>
                <div className="modal-row">
                  <div className="add-modal-title">Description</div>
                  <input className="form-control" type="text" name="homeDescription"
                    value={homeDescription} type="text" onChange={(e) => this.onChangeData(e.target.name, e.target.value)} />
                  {!isValid && homeDescription === '' && <span className="help-block">Field is required</span>}
                </div>
                <div className="modal-row-double">
                  <div className="modal-row">
                    <div className="add-modal-title">Country</div>
                    <Dropdown title="Select country" />
                  </div>
                  <div className="modal-row">
                    <div className="add-modal-title">Province</div>
                    <Dropdown title="Select province" />
                  </div>
                </div>
                <div className="modal-row-double">
                  <div className="modal-row">
                    <div className="add-modal-title">District</div>
                    <Dropdown title="Select district" />
                  </div>
                  <div className="modal-row">
                    <div className="add-modal-title">Ward</div>
                    <Dropdown title="Select ward" />
                  </div>
                </div>
                <div className="modal-row">
                  <div className="add-modal-title">Street</div>
                  <input className="form-control" type="text" />
                </div>
                <div className="modal-row">
                  <div className="add-modal-title">Images</div>
                  <img className="add-images-btn" src={ic_add_images} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-close" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-finish" onClick={this.handleAddHome} data-dismiss="modal">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: (message) => {
      dispatch(error(message));
    },
    success: (message) => {
      dispatch(success(message));
    },
    showModal: (message, confirm) => {
      dispatch(showModal(message, confirm))
    }
  }
};
export default connect(null, mapDispatchToProps)(Home);