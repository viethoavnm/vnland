import React, { Component } from "react";
import "../styles/Admin.scss";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listHome: []
    }
  }

  render() {
    return (
      <div className="admin-container">
        <div className="title-admin-page">Home</div>
      </div>
    );
  }
}
export default Home;