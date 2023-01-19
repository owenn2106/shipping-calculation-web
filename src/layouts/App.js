import { Layout } from "antd";
import logo from "../images/logo.png";
import AppContent from "./content";

import style from "./App.module.scss";
import SideNav from "./side-nav";

const { Content, Footer, Sider } = Layout;

const App = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
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
  );
};
export default App;
