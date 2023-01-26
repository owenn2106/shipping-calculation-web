import { useEffect } from "react";
import Lokasi from "../../components/lokasi-kargo/lokasi";
import Ekspedisi from "../../components/lokasi-kargo/ekspedisi";
import Pelayaran from "../../components/lokasi-kargo/pelayaran";
import Kargo from "../../components/lokasi-kargo/kargo";
// REDUX
import { useAppDispatch, useAppSelector } from "redux/hooks";
import actions from "redux/lokasi-kargo/actions";
// STYLE
import style from "./index.module.scss";

const LokasiKargo = () => {
  const dispatch = useAppDispatch();
  const [loadingLokasi, lokasi] = useAppSelector((state) => [
    state.lokasiKargo.loadingLokasi,
    state.lokasiKargo.lokasi,
  ]);

  useEffect(() => {
    dispatch({
      type: actions.GET_LOKASI,
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
      <h1 style={{ marginBottom: 30 }}>Lokasi &#38; Kargo</h1>
      <div className={style.lokasi__kargo__content__wrapper}>
        <Lokasi loading={loadingLokasi} data={lokasi} />
        <Ekspedisi />
        <Pelayaran />
        <Kargo />
      </div>
    </div>
  );
};

export default LokasiKargo;
