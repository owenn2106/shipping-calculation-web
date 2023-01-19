import { Card } from "antd";

const ActivityLog = () => {
  return (
    <Card
      title={<h3 style={{ padding: "16px 0" }}>Activity Log</h3>}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    ></Card>
  );
};

export default ActivityLog;
