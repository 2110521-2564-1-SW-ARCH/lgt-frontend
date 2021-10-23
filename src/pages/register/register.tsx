import React from "react";
import { Button, Input, Form, DatePicker } from "antd";
import "./register.scss";
import { postRegister } from "../../service/user.service";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Notification from "../../components/common/notification";

const Register: React.FC = () => {
  const dateFormat = "YYYY/MM/DD";
  const history = useHistory();

  const handleRegister = async (e: any) => {
    e["birthdate"] = moment(e.birthdate).format(dateFormat);
    try {
      const res = await postRegister(e);
      Notification({
        type: "success",
        message: "Create account successful",
        desc: "Let's login!",
      });
      history.push("/");
    } catch (error) {
      Notification({
        type: "error",
        message: "Create account error",
        desc: "Please inform your information again",
      });
    }
  };

  const handleRegisterFailed = (e: any) => {
    console.log(e);
  };

  return (
    <div className="register-container">
      <div className="bg-login">
        <div className="space-none"></div>
        <div className="space-white flex-col p-y-24">
          <div className="text-big semi-bold m-b-16">TRAVELLETSGO</div>
          <Form onFinish={handleRegister} onFinishFailed={handleRegisterFailed}>
            <Form.Item
              label="Firstname"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your firstname" },
              ]}
            >
              <Input placeholder="Enter your first name" className="input" />
            </Form.Item>
            <Form.Item
              label="Lastname"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your lastname" },
              ]}
            >
              <Input placeholder="Enter your last name" className="input" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input placeholder="Enter your username" className="input" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "Password must contain at least 8 characters which is one uppercase letter, one lowercase letter and one number",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="input"
              />
            </Form.Item>
            <Form.Item
              label="Re-type password"
              name="re-password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please enter your re-type password",
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "Password must contain at least 8 characters which is one uppercase letter, one lowercase letter and one number",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Two passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Enter your re-type password"
                className="input"
              />
            </Form.Item>
            <Form.Item label="birthdate" name="birthdate">
              <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="button">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
