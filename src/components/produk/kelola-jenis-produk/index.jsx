import { useEffect } from "react";
import { Card, Skeleton } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CardTitle from "./card-title";
import JenisProdukTable from "./jenis-produk-table";
import actions from "redux/produk/actions";

const KelolaJenisProduk = () => {
  const dispatch = useAppDispatch();
  const [loadingJenisProduk, jenisProduk] = useAppSelector((state) => [
    state.produk.loadingJenisProduk,
    state.produk.jenisProduk,
  ]);

  useEffect(() => {
    dispatch({
      type: actions.GET_JENIS_PRODUK,
    });
  }, [dispatch]);

  return (
    <Card
      title={<CardTitle jenisProduk={jenisProduk} />}
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    >
      {!loadingJenisProduk ? (
        <JenisProdukTable
          originData={jenisProduk
            .map((datum) => ({
              name: datum.name,
              key: datum.id,
            }))
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            })}
        />
      ) : (
        <Skeleton />
      )}
    </Card>
  );
};

export default KelolaJenisProduk;
