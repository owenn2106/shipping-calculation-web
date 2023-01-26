import { Card, Skeleton } from "antd";
import CardTitle from "./card-title";
import EkspedisiTable from "./ekspedisi-table";

const Ekspedisi = ({ loading, data }) => {
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
        <EkspedisiTable
          originData={data.map((datum, idx) => ({ ...datum, key: idx }))}
        />
      ) : (
        <Skeleton />
      )}
    </Card>
  );
};

export default Ekspedisi;
