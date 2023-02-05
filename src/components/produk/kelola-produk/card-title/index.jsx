import { useState } from "react";
import { Button, Modal, Input, Select, InputNumber } from "antd";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import produkActions from "redux/produk/actions";
import supplierActions from "redux/supplier/actions";
import _ from "lodash";
import { ITEM_UNITS } from "utils/constant";
import { useEffect } from "react";
import ImportExcelButton from "../import-excel-btn";

const CardTitle = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingUpdate, jenisProduk, suppliers] = useAppSelector((state) => [
    state.produk.loadingUpdate,
    state.produk.jenisProduk,
    state.supplier.suppliers,
  ]);

  const initialState = {
    name: "",
    jenis: "",
    unit: "",
    kubikasi: "",
    volumeBerat: 0,
    supplierId: [],
    keterangan: "",
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

  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

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
          <p>Kubikasi:</p>
          <Select
            value={newProduk.kubikasi}
            options={[
              {
                label: "Pilih Kubikasi Produk",
                value: "",
                disabled: true,
              },
              {
                label: "Tonase",
                value: "tonase",
              },
              {
                label: "Volume",
                value: "volume",
              },
            ]}
            onChange={(value) =>
              setNewProduk({ ...newProduk, kubikasi: value })
            }
            style={{ width: 200 }}
          />
        </div>
        {newProduk.kubikasi === "volume" ? (
          <div className="input__wrapper">
            <p>Volume:</p>
            <InputNumber
              step="0.000001"
              stringMode
              precision={7}
              style={{ width: 200 }}
              placeholder="Support 6 Desimal Belakang Koma..."
              onChange={(value) =>
                setNewProduk({ ...newProduk, volumeBerat: value })
              }
            />
          </div>
        ) : newProduk.kubikasi === "tonase" ? (
          <div className="input__wrapper">
            <p>Berat:</p>
            <InputNumber
              step="0.000001"
              stringMode
              precision={7}
              style={{ width: 200 }}
              placeholder="Support 6 Desimal Belakang Koma..."
              onChange={(value) =>
                setNewProduk({ ...newProduk, volumeBerat: value })
              }
            />
          </div>
        ) : null}
        <div className="input__wrapper">
          <p>Supplier:</p>
          <Select
            mode="multiple"
            value={newProduk.supplierId}
            options={supplierOptions}
            onChange={(value) =>
              setNewProduk({ ...newProduk, supplierId: value })
            }
            style={{ width: 200 }}
          />
        </div>
        <div className="input__wrapper">
          <p>Keterangan:</p>
          <Input
            placeholder="Keterangan Produk..."
            value={newProduk.keterangan}
            onChange={(e) =>
              setNewProduk({ ...newProduk, keterangan: e.currentTarget.value })
            }
          />
        </div>
      </Modal>
      <div className={style.card__title__content}>
        <h3 style={{ padding: "16px 0" }}>Kelola Produk</h3>
        <div className={style.action__btn__wrapper}>
          <ImportExcelButton />
          <Button
            type="primary"
            onClick={() => setModalOpen(true)}
            style={{ marginLeft: "20px" }}
          >
            Input Produk
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardTitle;
