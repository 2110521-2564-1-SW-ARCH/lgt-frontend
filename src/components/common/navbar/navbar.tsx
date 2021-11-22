import { Menu, Button, Modal } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./navbar.scss";
import { useState } from "react";
import { logout } from "../../../service/auth.service";

const Navbar: React.FC = () => {
  const history = useHistory();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const showLogoutModal = () => {
    setLogoutVisible(true);
  };
  const comfirmLogout = () => {
    console.log("logout");
    setLogoutVisible(false);
    logout();
    history.push("/");
  };

  const cancelLogout = () => {
    setLogoutVisible(false);
  };

  return (
    <div className="navbar-container">
      <div className="desktop height">
        <Menu mode="horizontal">
          <Menu.Item key="1" className="desktop-logo">
            <Link to="/">TRAVELLETSGO</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/my-routes">My routes</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="4" className="logout-tab">
            <div onClick={showLogoutModal}>Logout</div>
          </Menu.Item>
        </Menu>
      </div>
      <Modal
        centered
        visible={logoutVisible}
        onOk={comfirmLogout}
        onCancel={cancelLogout}
        footer={false}
        className="logout-modal"
      >
        <div className="m-b-16">Do you want to logout ?</div>
        <div className="flex-row flex-center m-t-30">
          <Button onClick={comfirmLogout} className="submit-btn m-r-10">
            Logout
          </Button>
          <Button onClick={cancelLogout} className="cancel-btn">
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
