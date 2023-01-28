import { Input } from "antd";
import InputSupplier from "../input-supplier";
import style from "./index.module.scss";

const CardTitle = () => {
  return (
    <div className={style.wrapper}>
      <div style={{ width: 500 }}>
        <Input
          placeholder="Cari Supplier dengan Nama, ID, atau Lokasi"
          style={{ width: "100%" }}
        />
      </div>
      <InputSupplier />
    </div>
  );
};

export default CardTitle;
