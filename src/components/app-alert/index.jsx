import { useEffect } from "react";
import { message } from "antd";
import { useAppSelector } from "redux/hooks";

const AppAlert = () => {
  const [lokasiKargoAlert] = useAppSelector((state) => [
    state.lokasiKargo.alert,
  ]);

  useEffect(() => {
    if (lokasiKargoAlert) {
      if (lokasiKargoAlert.type === "success") {
        message.success(lokasiKargoAlert.message);
      } else {
        message.error(lokasiKargoAlert.message);
      }
    }
  }, [lokasiKargoAlert]);
  return <></>;
};

export default AppAlert;
