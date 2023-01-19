import { Card } from "antd";

const Kargo = () => {
  return (
    <Card
      title={<h3 style={{ padding: "16px 0" }}>Kelola Kargo</h3>}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    ></Card>
  );
};

export default Kargo;
