import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Layout,
  Divider,
  Checkbox,
  Modal,
} from "antd";
import "./Login.scss";
import Logo from "../Dashboard/assets/logo.png";
import LoginLogo from "./assets/login.png";
import { useNavigate } from "react-router-dom";
import PasswordResetRequest from "../Dashboard/DashboardSubComponents/PasswordResetRequest";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authActions";
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Header } = Layout;

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [visibleReg, setVisibleReg] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  const [regError, setRegError] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [form] = Form.useForm();

  const history = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state?.auth?.loginMinistry?.data?.data || null
  );
  const loginSuccess = useSelector(
    (state) => state?.auth?.loginMinistry?.success?.status || false
  );
  const fetching = useSelector(
    (state) => state?.auth?.loginMinistry?.fetching || false
  );

  const errMsg = useSelector(
    (state) => state?.auth?.loginMinistry?.error?.message?.error || false
  );

  const isException = useSelector(
    (state) => state?.auth?.loginMinistry?.error?.status || false
  );

  useEffect(() => {
    if (loginSuccess) {
      localStorage.setItem("authToken", data?.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", data?.username);
      localStorage.setItem("email", data?.email);
      localStorage.setItem("type", data?.type);
      localStorage.setItem("id", data?.empId);
      localStorage.setItem("initials", data?.nameWithInitials);

      if (jwtDecode(data?.token).type === "office") {
        history(`/office-dashboard/${data?.username}`);
      } else if (jwtDecode(data?.token).type === "supplier") {
        history(`/supplier-dashboard/${jwtDecode(data?.token).username}`);
      } else {
        history(
          `/procument-staff-dashboard/${jwtDecode(data?.token).username}`
        );
      }
    }
    if (isException) {
      setError(errMsg);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 5000); //5s
    }
  }, [loginSuccess, isException]);

  const loginHandler = async (e) => {
    //handler method for login
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(loginUser({ email, password }));
  };

  const showPassword = () => {
    //show password method when check box is enabled
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const onSubmit = async () => {
    if (confirmPassword !== password) {
      setMatchPassword(false);
      setTimeout(() => {
        setMatchPassword(true);
        setInitialLoad(false);
      }, [5000]);
      return;
    }
    try {
      await axios
        .post("/api/auth/register", {
          username,
          email,
          password,
          type: "supplier",
        })
        .then(() => {
          dispatch(loginUser({ email, password }));
          setVisibleReg(false);
        });
    } catch (error) {
      setRegError(error.response.data.error);
      setTimeout(() => {
        setRegError("");
      }, [5000]);
    }
  };

  const setTitle = () => (
    <span>
      REGISTER FORM{" "}
      {initialLoad ? (
        ""
      ) : !matchPassword ? (
        <span style={{ color: "red", fontSize: "12px" }}>
          Password Missmatch
        </span>
      ) : (
        ""
      )}
      {regError && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {regError[0]} <br />
          {regError[1]}
        </span>
      )}
    </span>
  );

  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            textAlign: "center",
            backgroundColor: "#85adad",
          }}
        >
          <center>
            {/* <img src={Logo} style={{ maxWidth: "100px" }} /> */}
            <h1
              id="header"
              style={{ fontFamily: "serif", fontSize: "50px", color: "white" }}
            >
              ABC Constructions{" "}
            </h1>

            <Divider />
          </center>
        </Header>
      </Layout>

      <div className="login-page">
        <Row>
          <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
            <div className="left-side-inner-wrap">
              <div className="title">Procurement Management System</div>
              <center>
                {error && (
                  <span style={{ color: "white", background: "red" }}>
                    {error}
                  </span>
                )}
              </center>
              <div className="text-block">
                Log in to your account if you already have an account
              </div>
              <Form onFinish={loginHandler}>
                <label>Email</label>
                <Input
                  label={"EMAIL"}
                  name={"email"}
                  type={"email"}
                  size={"large"}
                  placeholder={"e.g example@gmail.com"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <Input
                  label={"PASSWORD"}
                  name={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Checkbox onClick={showPassword}>Show Password</Checkbox>
                <div>
                  <div
                    onClick={() => {
                      setVisibleReg(true);
                      setEmail("");
                      setPassword("");
                      setRegError("");
                      setMatchPassword(true);
                    }}
                    style={{
                      cursor: "pointer",
                      color: "#85adad",
                      textDecoration: "underline",
                    }}
                  >
                    Create an account
                  </div>
                </div>
                <br /> <br />
                {/* <a className="forget-text">Forgot password?</a> */}
                <div>
                  {" "}
                  <PasswordResetRequest />
                </div>
                <div className="btn-wrap">
                  <center>
                    {isError && (
                      <small style={{ color: "red" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    <Button
                      className="submit-btn"
                      htmlType="submit"
                      type={"primary"}
                      disabled={fetching}
                      loading={fetching}
                    >
                      SUBMIT
                    </Button>
                  </center>
                </div>
              </Form>
            </div>
          </Col>
          <Col className="right-side" xl={9} lg={9} md={0} sm={0}>
            {window.innerWidth > 900 && (
              <div
                className="background-img-container"
                style={{ backgroundImage: `url(${LoginLogo})` }}
              />
            )}
          </Col>
        </Row>
      </div>
      <Modal
        title={setTitle()}
        visible={visibleReg}
        onCancel={() => setVisibleReg(false)}
        destroyOnClose={true}
        footer={null}
      >
        <Form form={form} onFinish={onSubmit}>
          <Form.Item name={"username"}>
            Uername{" "}
            <Input
              type="text"
              placeholder="Enter your username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item name={"email"}>
            Email{" "}
            <Input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item name={"password"}>
            Password{" "}
            <Input.Password
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item name={"re-password"}>
            Confirm Password{" "}
            <Input.Password
              type="password"
              placeholder="Enter password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <div className="btn-wrap">
              <Button className="submit-btn" htmlType="submit" type={"primary"}>
                SUBMIT
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
