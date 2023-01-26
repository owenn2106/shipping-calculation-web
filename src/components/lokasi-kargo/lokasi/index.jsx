import { Card, Skeleton } from "antd";
import CardTitle from "./card-title";
import LokasiTable from "./lokasi-table";

const Lokasi = ({ loading, data }) => {
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
        <LokasiTable
          originData={data.map((datum, idx) => ({ ...datum, key: idx }))}
        />
      ) : (
        <Skeleton />
      )}
    </Card>
  );
};

export default Lokasi;
