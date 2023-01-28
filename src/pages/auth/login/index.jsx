import style from "./index.module.scss";
import { Input, Button } from "antd";

const LoginPage = () => {
  return (
    <div className={style.login__wrapper}>
      <div className={style.login__content}>
        <h3 className={style.login__title}>Shipping Calculation</h3>
        <div className="input__wrapper">
          <p>Email:</p>
          <Input placeholder="Your email..." />
        </div>
        <div className="input__wrapper">
          <p>Password:</p>
          <Input placeholder="Your password..." />
        </div>
        <Button type="primary" style={{ width: "100%" }}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
