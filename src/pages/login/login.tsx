import React from "react";
import { Button, Input, Form } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./login.scss";
import { loginApi } from "../../service/auth.service";
import Notification from "../../components/common/notification";

const Login: React.FC = () => {
  const history = useHistory();

  const handleLogin = async (e: any) => {
    try {
      await loginApi(e);
      Notification({
        type: "success",
        message: "Login success",
        desc: "Let's go travel!",
      });
      history.push("/home");
    } catch (error) {
      console.log(error);
      Notification({
        type: "error",
        message: "Login fail",
        desc: "username or password incorrect",
      });
    }
    console.log(e);
  };

  const handleLoginFailed = (e: any) => {
    console.log(e);
  };

  return (
    <div className="login-container">
      <div className="bg-login">
        <div className="space-none"></div>
        <div className="space-white flex-col">
          <div className="text-big semi-bold m-b-16">TRAVELLETSGO</div>
          <Form onFinish={handleLogin} onFinishFailed={handleLoginFailed}>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                }
              ]}
            >
              <Input placeholder="Enter your username" className="input" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="input"
              />
            </Form.Item>
            <div className="m-b-10">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
            <Form.Item>
              <Button htmlType="submit" className="button">
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <Link to="/password/reset">Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
