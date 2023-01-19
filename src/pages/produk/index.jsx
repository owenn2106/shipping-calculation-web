import KelolaProduk from "../../components/produk/kelola-produk";
import KelolaJenisProduk from "../../components/produk/kelola-jenis-produk";
import style from "./index.module.scss";

const Produk = () => {
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
