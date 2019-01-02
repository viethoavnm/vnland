import React, { Component } from "react";
import "./LeftSideBar.scss";
import { connect } from 'react-redux';
import * as UserServices from "../../pages/users/services/userService";
import { selectMyServices, selectSettings } from "../../actions";
import { redirectPageConstants } from "../../constants";

class LeftSideBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: ""
    }
  }

  handleLogOut = () => {
    this.props.dispatch(userActions.logout());
  };

  handleRedirectPage = (nextPage) => {
    this.setState({
      currentPage: nextPage
    })
    this.props.history.push(nextPage);
  }

  render() {
    const urlPage = window.location.pathname.toLowerCase();
    const page = localStorage.getItem("page");
    return (
      <div className="left-side-bar">
        <ul>
          <div>
            <a onClick={(e) => this.handleRedirectPage("/Menu1")}>
              <li className={urlPage === "/menu1" ? "item-menu selected" : "item-menu"}>
                <i className="fas fa-coffee"></i>
                <span className="menu">Menu1</span>
              </li>
            </a>
            <a onClick={(e) => this.handleRedirectPage("/Menu2")}>
              <li className={urlPage === "/menu2" ? "item-menu selected" : "item-menu"}>
                <i className="fas fa-ticket-alt"></i>
                <span className="menu">Menu2</span>
              </li>
            </a>
            <a onClick={(e) => this.handleRedirectPage("/Menu3")}>
              <li className={urlPage === "/menu3" ? "item-menu selected" : "item-menu"}>
                <i className="fas fa-ticket-alt"></i>
                <span className="menu">Menu3</span>
              </li>
            </a>
            <a>
              <li id="explan-menu" className={urlPage === "/menu4" || urlPage === "/menu5" || urlPage === "/menu6" ? "item-menu dropdown selected" : "item-menu dropdown"}>
                <i className="fas fa-walking"></i>
                <span className="menu">List menu</span>
                <i className="fas fa-angle-down ic-down"></i>
                <ul className="sub-menu">
                  <li onClick={(e) => this.handleRedirectPage("/menu4")}>
                    <span>Menu4</span>
                  </li>
                  <li onClick={(e) => this.handleRedirectPage("/menu5")}>
                    <span>Menu5</span>
                  </li>
                  <li onClick={(e) => this.handleRedirectPage("/menu6")}>
                    <span>Menu6</span>
                  </li>
                </ul>
              </li>
            </a>
          </div>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);