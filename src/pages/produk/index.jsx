import KelolaProduk from "../../components/produk/kelola-produk";
import KelolaJenisProduk from "../../components/produk/kelola-jenis-produk";
import style from "./index.module.scss";
import { useAppDispatch } from "redux/hooks";
import { useEffect } from "react";
import actions from "redux/produk/actions";

const Produk = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: actions.GET_PRODUK,
    });

    return () => {
      dispatch({
        type: actions.SET_STATE,
        payload: {
          alert: null,
        },
      });
    };
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Produk</h1>
      <div className={style.produk__content__wrapper}>
        <KelolaProduk />
        <KelolaJenisProduk />
      </div>
    </div>
  );
};

export default Produk;
