import ProfilAkun from "../../components/settings/profil-akun";
import KelolaAkun from "../../components/settings/kelola-akun";
import style from "./index.module.scss";

const Settings = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Akun &#38; Settings</h1>
      <div className={style.settings__content__wrapper}>
        <ProfilAkun />
        <KelolaAkun />
      </div>
    </div>
  );
};

export default Settings;
