import { Card } from "antd";

const RiwayatHarga = () => {
  return (
    <Card
      title={<h3 style={{ padding: "16px 0" }}>Riwayat Perubahan Harga</h3>}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    ></Card>
  );
};

export default RiwayatHarga;
