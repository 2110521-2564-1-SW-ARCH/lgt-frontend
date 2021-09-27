import React from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./navbar.scss";

const Navbar: React.FC = () => {

    const history = useHistory();

    return (
      <div className="navbar-container">
        <div className="desktop height">
          <Menu mode="horizontal">
            <Menu.Item key="1" className="desktop-logo">
              <Link to="/home">TRAVELLESTGO</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/transport">Transport</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            {/* <Menu.Item key="6" className="logout-tab">
              <div onClick={showLogoutModal}>Logout</div>
            </Menu.Item> */}
          </Menu>
        </div>
      </div>
    );
}

export default Navbar
