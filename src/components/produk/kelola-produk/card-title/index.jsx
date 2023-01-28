import { useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import produkActions from "redux/produk/actions";
import supplierActions from "redux/supplier/actions";
import _ from "lodash";
import { ITEM_UNITS } from "utils/constant";
import { useEffect } from "react";

const CardTitle = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingUpdate, jenisProduk, suppliers] = useAppSelector((state) => [
    state.produk.loadingUpdate,
    state.produk.jenisProduk,
    state.supplier.suppliers,
  ]);

  const initialState = {
    id: "",
    name: "",
    jenis: "",
    unit: "",
    supplierId: "",
  };

  const [newProduk, setNewProduk] = useState(initialState);

  useEffect(() => {
    dispatch({
      type: supplierActions.GET_SUPPLIER,
    });
  }, [dispatch]);

  const jenisProdukOptions = [
    {
      label: "Pilih Jenis Produk",
      value: "",
      disabled: true,
    },
    ...jenisProduk.map((jenis) => ({
      value: jenis,
      label: jenis,
    })),
  ];

  const unitsOptions = [
    {
      label: "Pilih Unit Produk",
      value: "",
      disabled: true,
    },
    ...ITEM_UNITS.map((unit) => ({
      value: unit,
      label: unit,
    })),
  ];

  const supplierOptions = [
    {
      label: "Pilih Supplier",
      value: "",
      disabled: true,
    },
    ...suppliers.map((supplier) => ({
      value: supplier.id,
      label: supplier.name,
    })),
  ];

  const handleOk = () => {
    dispatch({
      type: produkActions.ADD_PRODUK,
      payload: {
        data: newProduk,
      },
    });

    setNewProduk(initialState);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewProduk(initialState);
  };
  return (
    <>
      <Modal
        title="Input Produk"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          disabled: _.isEqual(newProduk, initialState),
          loading: loadingUpdate,
        }}
      >
        <div className="input__wrapper">
          <p>ID Produk (digunakan untuk Barcode):</p>
          <Input
            placeholder="ID Produk..."
            value={newProduk.id}
            onChange={(e) =>
              setNewProduk({ ...newProduk, id: e.currentTarget.value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Nama Produk (CC):</p>
          <Input
            placeholder="Nama Produk..."
            value={newProduk.name}
            onChange={(e) =>
              setNewProduk({ ...newProduk, name: e.currentTarget.value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Jenis Produk:</p>
          <Select
            value={newProduk.jenis}
            options={jenisProdukOptions}
            onChange={(value) => setNewProduk({ ...newProduk, jenis: value })}
            style={{ width: 200 }}
          />
        </div>
        <div className="input__wrapper">
          <p>Unit Satuan:</p>
          <Select
            value={newProduk.unit}
            options={unitsOptions}
            onChange={(value) => setNewProduk({ ...newProduk, unit: value })}
            style={{ width: 200 }}
          />
        </div>
        <div className="input__wrapper">
          <p>Supplier:</p>
          <Select
            value={newProduk.supplierId}
            options={supplierOptions}
            onChange={(value) =>
              setNewProduk({ ...newProduk, supplierId: value })
            }
            style={{ width: 200 }}
          />
        </div>
      </Modal>
      <div className={style.card__title__content}>
        <h3 style={{ padding: "16px 0" }}>Kelola Produk</h3>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Input Produk
        </Button>
      </div>
    </>
  );
};

export default CardTitle;