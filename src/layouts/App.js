import { Layout } from "antd";
import "antd/dist/reset.css";
import logo from "../images/logo.png";
import AppContent from "./content";
import AppAlert from "components/app-alert";
import style from "./App.module.scss";
import SideNav from "./side-nav";
import { Routes, Route } from "react-router-dom";
import LoginPage from "pages/auth/login";

const { Content, Footer, Sider } = Layout;

const App = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <div>
      {/* <Routes>
        <Route path="/login" element={<LoginPage />} exact />
        <Route
          path="/"
          element={
            <> */}
      <AppAlert />
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider>
          <div
            className={style.logo_wrapper}
            style={{
              height: 32,
              margin: 16,
            }}
          >
            <img src={logo} alt="logo" />
            <p>Shipping Calculation</p>
          </div>
          <SideNav />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              style={{
                marginTop: "16px",
                padding: 24,
                minHeight: 360,
              }}
            >
              <AppContent />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Shipping Calculation ©2023 Created by Owenn Gimli
          </Footer>
        </Layout>
      </Layout>
      {/* </>
          }
          exact
        />
      </Routes> */}
    </div>
  );
};
export default App;
