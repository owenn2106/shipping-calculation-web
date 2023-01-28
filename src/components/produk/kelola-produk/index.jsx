import { Card, Skeleton } from "antd";
import { useAppSelector } from "redux/hooks";
import CardTitle from "./card-title";
import ProdukTable from "./produk-table";

const KelolaProduk = () => {
  const [produk, loadingProduk] = useAppSelector((state) => [
    state.produk.produk,
    state.produk.loadingProduk,
  ]);

  return (
    <Card
      title={<CardTitle />}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    >
      {!loadingProduk ? (
        <ProdukTable
          originData={produk.map((datum, idx) => ({ ...datum, key: idx }))}
        />
      ) : (
        <Skeleton />
      )}
    </Card>
  );
};

export default KelolaProduk;
