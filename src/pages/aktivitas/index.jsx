import { Card } from "antd";
import CardTitle from "../../components/aktivitas/card-title";

const Aktivitas = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Aktivitas</h1>
      <Card
        title={<CardTitle />}
        bordered={false}
        style={{
          width: "100%",
          minHeight: "70vh",
        }}
      ></Card>
    </div>
  );
};

export default Aktivitas;
