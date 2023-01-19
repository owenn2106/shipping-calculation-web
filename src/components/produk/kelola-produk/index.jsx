import { Card } from "antd";

const KelolaProduk = () => {
  return (
    <Card
      title={<h3 style={{ padding: "16px 0" }}>Kelola Produk</h3>}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    ></Card>
  );
};

export default KelolaProduk;
