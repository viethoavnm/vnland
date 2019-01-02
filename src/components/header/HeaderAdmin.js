import React, { Component } from "react";
import "./Header.scss";
import { connect } from "react-redux";
import ic_branch from "../../public/images/icons/asio_brand_blue.png";
import ic_logo from "../../public/images/icons/asio_logo_blue.png";
import { setLanguage, userActions } from "../../actions";
import ic_en from "../../public/images/icons/en.png";
import ic_vi from "../../public/images/icons/vi.png";

class HeaderAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      image_profile: null
    }
  }

  handleLogOut = () => {
    this.props.logout();
    this.props.history.push("/Login");
  };

  changeLanguage = () => {
    if (this.props.locale == "vi") {
      this.props.setLanguage("en");
    } else {
      this.props.setLanguage("vi");
    }
  }

  render() {
    const {
      username,
      email,
      image_profile
    } = this.state;
    const urlPage = window.location.pathname.toLowerCase();

    return (
      <div className="header-session">
        <div className="main-header">
          {
            <div className="branch-box mr-auto">
              <img className="ic-logo" src={ic_logo} />
              <img className="ic-branch" src={ic_branch} />
            </div>
          }
          <div className="header-contents">
            <button className="locale-box" onClick={this.changeLanguage}>
              <img className="header-icon" src={this.props.locale === "en" ? ic_en : ic_vi} />
              {
                this.props.locale
              }
            </button>

            <div className="user-box">
              <i className="fas fa-users header-icon"></i>
              <button className="btn-show-user-info dropdown-toggle" type="button" data-toggle="dropdown">{username}
              </button>
              <div className="dropdown-menu profile">
                <div className="profile-userpic">
                  <img src={image_profile ? image_profile : ic_logo} className="img-responsive" alt="" />
                </div>
                <div className="profile-usertitle">
                  <div className="profile-name">
                    {username}
                  </div>
                  <div className="profile-email">
                    {email}
                  </div>
                </div>
                <div className="profile-userbuttons">
                  <button type="button" className="btn btn-sm btn-become-host" onClick={(e) => this.props.history.push("/UserInfo")}>Update info</button>
                  <button type="button" className="btn btn-sm btn-logout" onClick={this.handleLogOut}>Logout</button>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.authentication;
  return {
    loggedIn,
    locale: state.translation.locale
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: (locale) => {
      dispatch(setLanguage(locale));
    },
    logout: () => {
      dispatch(userActions.logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);