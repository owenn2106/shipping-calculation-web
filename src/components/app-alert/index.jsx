import { useEffect } from "react";
import { message } from "antd";
import { useAppSelector } from "redux/hooks";

const AppAlert = () => {
  const [lokasiKargoAlert, supplierAlert, produkAlert] = useAppSelector(
    (state) => [
      state.lokasiKargo.alert,
      state.supplier.alert,
      state.produk.alert,
    ]
  );

  useEffect(() => {
    if (lokasiKargoAlert) {
      if (lokasiKargoAlert.type === "success") {
        message.success(lokasiKargoAlert.message);
      } else {
        message.error(lokasiKargoAlert.message);
      }
    }
  }, [lokasiKargoAlert]);

  useEffect(() => {
    if (supplierAlert) {
      if (supplierAlert.type === "success") {
        message.success(supplierAlert.message);
      } else {
        message.error(supplierAlert.message);
      }
    }
  }, [supplierAlert]);

  useEffect(() => {
    if (produkAlert) {
      if (produkAlert.type === "success") {
        message.success(produkAlert.message);
      } else {
        message.error(produkAlert.message);
      }
    }
  }, [produkAlert]);

  return <></>;
};

export default AppAlert;
