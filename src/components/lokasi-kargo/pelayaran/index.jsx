import { Card } from "antd";

const Pelayaran = () => {
  return (
    <Card
      title={<h3 style={{ padding: "16px 0" }}>Kelola Nama Pelayaran</h3>}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    ></Card>
  );
};

export default Pelayaran;
