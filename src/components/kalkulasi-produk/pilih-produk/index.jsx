import { Card } from "antd";

const PilihProduk = () => {
  return (
    <Card
      title={<h3 style={{ padding: "16px 0" }}>Pilih Produk Untuk Dijual</h3>}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    ></Card>
  );
};

export default PilihProduk;
