import Lokasi from "../../components/lokasi-kargo/lokasi";
import Ekspedisi from "../../components/lokasi-kargo/ekspedisi";
import Pelayaran from "../../components/lokasi-kargo/pelayaran";
import Kargo from "../../components/lokasi-kargo/kargo";
import style from "./index.module.scss";

const LokasiKargo = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Lokasi &#38; Kargo</h1>
      <div className={style.lokasi__kargo__content__wrapper}>
        <Lokasi />
        <Ekspedisi />
        <Pelayaran />
        <Kargo />
      </div>
    </div>
  );
};

export default LokasiKargo;
