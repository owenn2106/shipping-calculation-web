import { Layout } from "antd";
import "antd/dist/reset.css";
import logo from "../images/logo.png";
import AppContent from "./content";
import AppAlert from "components/app-alert";
import style from "./App.module.scss";
import SideNav from "./side-nav";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "pages/auth/login";
import actions from "redux/auth/actions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const { Content, Footer, Sider } = Layout;

const App = () => {
  const dispatch = useAppDispatch();
  const [user] = useAppSelector((state) => [state.auth.user]);

  useEffect(() => {
    dispatch({ type: actions.GET_CURRENT_USER });
  }, [dispatch]);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} exact />
        <Route
          path="*"
          element={
            user ? (
              <>
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
                      <p style={{ marginBottom: 0 }}>Shipping Calculation</p>
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
                        <Outlet />
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
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
          exact
        />
      </Routes>
    </div>
  );
};
export default App;
