import { Card, Skeleton } from "antd";
import CardTitle from "./card-title";
import PelayaranTable from "./pelayaran-table";

const Pelayaran = ({ loading, data }) => {
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
        <PelayaranTable
          originData={data.map((datum, idx) => ({ ...datum, key: idx }))}
        />
      ) : (
        <Skeleton />
      )}
    </Card>
  );
};

export default Pelayaran;
