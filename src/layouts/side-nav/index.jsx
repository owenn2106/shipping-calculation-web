import { Menu } from "antd";
import { NAV_ITEMS } from "../../utils/constant";
import { useNavigate, useLocation } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const activeKey = path !== "/" ? path.split("/")[1] : "dashboard";

  return (
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
  );
};

export default SideNav;
