import { useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Empty } from "antd";
import {
  LogoutOutlined,
  SendOutlined,
  HomeOutlined,
  PhoneFilled,
  MailOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles/Dashboard.css";
import Logo from "./assets/logo.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CarouselView from "./DashboardSubComponents/CarouselView";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authActions";
import AcceptOrReject from "./DashboardSubComponents/procument-staff/AcceptOrReject";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ user = null }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const loggedUser = { ...user };
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  //Procument Staff Queries
  const queryExamineOrder = params.get("_optL");
  //------------------------------------------------------
  //Define Your Own Queries bellow

  const { username } = useParams();

  const date = new Date();
  const hrs = date.getHours();

  const dispatch = useDispatch();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const setHeader = (type) => {
    setDashboard(type);
    switch (type) {
      case "dashboard":
        document.getElementById("header").innerHTML = "Dashboard";
        break;
      case "leave":
        document.getElementById("header").innerHTML = "Examine Order";
        break;
      //use another case and implement your header here
      default:
        break;
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  };

  const _displayWarning = () => (
    <Empty
      image={"https://i.ibb.co/r3jR052/warn.png"}
      description={"We are sorry. You are not authorized for this route"}
    />
  );

  const _getPermissionRoutes = () => {
    if (dashboard !== "dashboard") {
      switch (loggedUser?.type) {
        case "procument-staff":
          if (queryExamineOrder === "true") return <AcceptOrReject />;
          else if (dashboard) return _displayWarning();
        case "office":
        //Site manager and Manager Components
        //there are two types of office. Please use username use correct implementation here
        //for any clarifications see mongoDB
        case "supplier":
        //same as procument-staff
        default:
          return <></>;
      }
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
          backgroundColor: "#85adad",
        }}
      >
        {collapsed === false ? (
          <div className="logo">
            <center>
              <p
                onClick={() => {
                  history(
                    `/${
                      username === "site-manager" || username === "manager"
                        ? "office"
                        : username === "Manager"
                        ? "procument-staff"
                        : "supplier"
                    }-dashboard/${loggedUser?.username}`
                  );
                  setHeader("dashboard");
                }}
                style={{ cursor: "pointer" }}
              >
                ABC Constructions
              </p>
            </center>
          </div>
        ) : (
          <center>
            <HomeOutlined
              style={{ color: "white", marginTop: "50px", cursor: "pointer" }}
              onClick={() => {
                history(
                  `/${
                    username === "site-manager" || username === "manager"
                      ? "subject-officer"
                      : username === "Manager"
                      ? "procument-staff"
                      : "supplier"
                  }-dashboard/${loggedUser?.username}`
                );
                setHeader("dashboard");
              }}
            />
          </center>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={
            queryExamineOrder === "true"
              ? ["0"]
              : //if you want more selected tabs use ternary and implement here
                null
          }
        >
          {loggedUser?.type === "office" ? (
            <>
              {loggedUser?.username === "manager" && (
                <>{/* implement Manager Tabs Here */}</>
              )}
              {loggedUser?.username === "site-manager" && (
                <>{/* implement Site-Manager Tabs Here */}</>
              )}
            </>
          ) : loggedUser?.type === "procument-staff" ? (
            <>
              <Menu.Item
                key="0"
                icon={<SendOutlined />}
                onClick={() => {
                  setHeader("leave");
                  history(
                    `/procument-staff-dashboard/${loggedUser?.username}?_optL=true`
                  );
                }}
              >
                Examine Order
              </Menu.Item>
            </>
          ) : (
            <>{/* implement Supplier Tabs Here */}</>
          )}
        </Menu>
        <br />
        <br />
        {collapsed === false ? (
          <center>
            <Button icon={<LogoutOutlined />} onClick={logoutHandler}>
              Sign Out
            </Button>
          </center>
        ) : (
          <center>
            <LogoutOutlined
              style={{ color: "white" }}
              onClick={logoutHandler}
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout" style={{ backgroundColor: "white" }}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            textAlign: "center",
            backgroundColor: "#85adad",
            position: "sticky",
            top: 0,
          }}
        >
          <h1
            id="header"
            style={{ fontFamily: "serif", fontSize: "20px", color: "white" }}
          >
            {queryExamineOrder === "true"
              ? "Examine Order"
              : //add ternary and implement your own header
                "Dashboard"}
          </h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>{loggedUser?.fullName}</Breadcrumb.Item>
          </Breadcrumb>
          {!queryExamineOrder && (
            //Please restrict your query param as above to avoid the Slide Show in other tabs you clicked
            <CarouselView />
          )}

          {_getPermissionRoutes()}
        </Content>
        <br />
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#b3cccc",
            position: "sticky",
            top: 0,
            bottom: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <PhoneFilled /> 0776988789 <br />
              <MailOutlined /> abcconstructions@gmail.com <br />
            </div>
            <div>
              Follow Us <br />
              <div style={{ fontSize: "20px" }}>
                <FacebookFilled /> <TwitterCircleFilled /> <InstagramFilled />
              </div>
            </div>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
