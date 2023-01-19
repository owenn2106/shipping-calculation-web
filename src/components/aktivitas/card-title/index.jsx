import { Input } from "antd";
import style from "./index.module.scss";

const CardTitle = () => {
  return (
    <div className={style.wrapper}>
      <div style={{ width: 600 }}>
        <Input
          placeholder="Cari Aktivitas dengan Nama Pengguna, Tipe Aktivitas atau Waktu..."
          size="large"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default CardTitle;
