import { useState, useEffect } from "react";
import { Card, Divider, Select } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import supplierActions from "redux/supplier/actions";
import produkActions from "redux/produk/actions";
import style from "./index.module.scss";
import ProdukTable from "./produk-table";
import InputNota from "./input-nota";

const PilihProduk = () => {
  const dispatch = useAppDispatch();
  const [suppliers, produk] = useAppSelector((state) => [
    state.supplier.suppliers,
    state.produk.produk,
  ]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [supplierProduk, setSupplierProduk] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState([]);

  useEffect(() => {
    if (selectedSupplier) {
      const filteredProduk = produk.filter((obj) =>
        obj.supplierId?.includes(selectedSupplier)
      );
      setSupplierProduk(filteredProduk);
    }

    // eslint-disable-next-line
  }, [selectedSupplier]);

  useEffect(() => {
    dispatch({
      type: supplierActions.GET_SUPPLIER,
    });

    dispatch({
      type: produkActions.SUBSCRIBE_TO_PRODUK,
    });

    return () =>
      dispatch({
        type: produkActions.UNSUBSCRIBE_FROM_PRODUK,
      });
  }, [dispatch]);

  const supplierOptions = suppliers
    .map((supplier) => ({
      value: supplier.id,
      label: `${supplier.location} - ${supplier.name}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Card
      bordered={false}
      style={{
        width: "100%",
        minHeight: "60vh",
      }}
    >
      <h3>Pilih Produk Untuk Dijual</h3>

      <div className={style.pilih__supplier}>
        <p>Pilih Supplier:</p>
        <Select
          value={selectedSupplier}
          options={supplierOptions}
          onChange={(value) => setSelectedSupplier(value)}
          style={{ width: "50%" }}
          disabled={selectedProduk.length > 0}
        />
      </div>

      <ProdukTable
        data={supplierProduk}
        selectedProduk={selectedProduk}
        setSelectedProduk={setSelectedProduk}
      />

      <Divider />

      <InputNota selectedProduk={selectedProduk} />
    </Card>
  );
};

export default PilihProduk;
