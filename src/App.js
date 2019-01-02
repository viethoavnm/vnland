import React, { Component } from "react";
import "./App.scss";
import Routes from '../src/Routes';
import HeaderAdmin from "./components/header/HeaderAdmin";
import { alertActions } from '../src/actions';
import { history } from '../src/helper';
import { connect } from "react-redux";
import LeftSideBar from "./components/leftSideBar/LeftSideBar";
import { Modal, Button } from 'react-bootstrap';
import { clear } from "./actions";
import ConfirmModal from "./components/confirmModal/ConfirmModal";

class App extends Component {

  constructor(props) {
    super(props);
  }

  closeAlert = () => {
    this.props.clear();
  }

  render() {
    const { alert } = this.props;
    let urlPage = window.location.pathname.toLowerCase();
    let hiddenLeftMenu = false;
    let hiddenHeader = false;
    return (
      <div className={hiddenLeftMenu ? hiddenHeader ? "body-container hidden-header hidden-left-menu" : "body-container hidden-left-menu" : "body-container"}>
        {
          !hiddenHeader && <HeaderAdmin history={history} />
        }
        <div className="wrapper">
          {
            !hiddenLeftMenu && <LeftSideBar history={history} />
          }
          {
            alert.message && <Modal.Dialog onHide={this.closeAlert}>
              <Modal.Header>
                <div>Notification</div>
              </Modal.Header>
              <Modal.Body>
                <div dangerouslySetInnerHTML={{ __html: alert.message }}></div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-primary" onClick={this.closeAlert}>Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          }
          <ConfirmModal />
          <div id="content">
            <Routes history={history} />
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const mapDispatchToProps = dispatch => {
  return {
    clear: () => {
      dispatch(clear());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);