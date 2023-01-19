import React from "react";
import ActivityLog from "../../components/activity-log";
import RiwayatHarga from "../../components/riwayat-harga";
import style from "./index.module.scss";

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Dashboard</h1>
      <div className={style.dashboard__content__wrapper}>
        <ActivityLog />
        <RiwayatHarga />
      </div>
    </div>
  );
};

export default Dashboard;
