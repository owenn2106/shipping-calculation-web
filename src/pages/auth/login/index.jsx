import { useState } from "react";
import style from "./index.module.scss";
import { Input, Button } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import actions from "redux/auth/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [loading, user] = useAppSelector((state) => [
    state.auth.loading,
    // state.auth.error,
    state.auth.user,
  ]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch({
      type: actions.LOGIN,
      payload: {
        email,
        password,
      },
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className={style.login__wrapper}>
      <div className={style.login__content}>
        <h3 className={style.login__title}>Shipping Calculation</h3>
        <div className="input__wrapper">
          <p>Email:</p>
          <Input
            placeholder="Your email..."
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="input__wrapper">
          <p>Password:</p>
          <Input.Password
            placeholder="Your password..."
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <Button
          loading={loading}
          type="primary"
          style={{ width: "100%" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
