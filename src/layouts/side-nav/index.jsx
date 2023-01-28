import { Menu, Button } from "antd";
import { NAV_ITEMS } from "../../utils/constant";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import actions from "redux/auth/actions";

const SideNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const activeKey = path !== "/" ? path.split("/")[1] : "dashboard";

  const handleLogout = () => {
    dispatch({
      type: actions.LOGOUT,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Menu
        theme="dark"
        selectedKeys={[activeKey]}
        mode="inline"
        items={NAV_ITEMS}
        onClick={({ key }) => {
          if (key === "dashboard") {
            navigate("/");
          } else {
            navigate("/" + key);
          }
        }}
      />
      <Button
        type="primary"
        style={{ width: "80%", marginTop: "100px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default SideNav;
