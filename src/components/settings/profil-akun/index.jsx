import { Card, Input, Button } from "antd";
import style from "./index.module.scss";

const ProfilAkun = () => {
  return (
    <Card
      title={<h3 style={{ padding: "16px 0" }}>Profil Akun</h3>}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    >
      <div className={style.profil__content__wrapper}>
        <div>
          <h3>Akun</h3>
          <p>
            Pengelolaan Akun dan Profil harus disesuaikan dengan masing-masing
            ketentuan pengguna aplikasi.
          </p>
        </div>
        <div>
          <div className={style.input__wrapper}>
            <p>Username</p>
            <Input placeholder="Username..." size="large" />
          </div>
          <div className={style.input__wrapper}>
            <p>Email</p>
            <Input placeholder="Email..." size="large" />
          </div>
          <div className={style.input__wrapper}>
            <p>Nama</p>
            <Input placeholder="Nama..." size="large" />
          </div>
          <div className={style.input__wrapper}>
            <p>Jabatan</p>
            <Input placeholder="Jabatan..." size="large" />
          </div>
          <Button
            type="primary"
            size="large"
            style={{ width: "100%", marginTop: "1em" }}
          >
            Ubah Profil
          </Button>
        </div>
        <div>
          <div className={style.input__wrapper}>
            <p>Password</p>
            <Input placeholder="Password..." size="large" />
          </div>
          <div className={style.input__wrapper}>
            <p>Ketik Ulang Password</p>
            <Input placeholder="Ketik Ulang Password..." size="large" />
          </div>
          <Button
            type="primary"
            size="large"
            style={{ width: "100%", marginTop: "1em" }}
          >
            Ubah Password
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfilAkun;
