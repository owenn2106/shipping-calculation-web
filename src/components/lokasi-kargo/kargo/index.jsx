import { Card, Skeleton } from "antd";
import CardTitle from "./card-title";
import KargoTable from "./kargo-table";

const Kargo = ({ loading, data }) => {
  return (
    <Card
      title={<CardTitle />}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    >
      {!loading ? (
        <KargoTable
          originData={data.map((datum, idx) => ({ ...datum, key: idx }))}
        />
      ) : (
        <Skeleton />
      )}
    </Card>
  );
};

export default Kargo;
