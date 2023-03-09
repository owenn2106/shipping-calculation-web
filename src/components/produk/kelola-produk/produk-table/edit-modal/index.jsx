import { useState } from "react";
import { Modal, Input, Select, InputNumber } from "antd";
import actions from "redux/produk/actions";
import supplierActions from "redux/supplier/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useEffect } from "react";
import { ITEM_UNITS } from "utils/constant";

const EditModal = ({ isOpen, setOpen, editRecord, setEditRecord }) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState(editRecord);

  const [jenisProduk, suppliers] = useAppSelector((state) => [
    state.produk.jenisProduk,
    state.supplier.suppliers,
  ]);

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
      value: jenis.name,
      label: jenis.name,
    })),
  ].sort((a, b) => a.value.localeCompare(b.value));

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
  ].sort((a, b) => a.value.localeCompare(b.value));

  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  useEffect(() => {
    if (editRecord) setData(editRecord);
  }, [editRecord]);

  const handleOk = () => {
    dispatch({
      type: actions.UPDATE_PRODUK,
      payload: {
        data: data,
      },
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setEditRecord(null);
    setData(editRecord);
    setOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      title={`Edit Produk`}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="input__wrapper">
        <p>Merk Produk:</p>
        <Input
          onChange={(e) => setData({ ...data, merk: e.currentTarget.value })}
          value={data?.merk}
        />
      </div>
      <div className="input__wrapper">
        <p>Nama Produk:</p>
        <Input
          onChange={(e) => setData({ ...data, name: e.currentTarget.value })}
          value={data?.name}
        />
      </div>
      <div className="input__wrapper">
        <p>Jenis Produk:</p>
        <Select
          style={{ width: "100%" }}
          defaultValue={data?.jenis}
          options={jenisProdukOptions}
          onChange={(value) => setData({ ...data, jenis: value })}
        />
      </div>
      <div className="input__wrapper">
        <p>Unit Satuan:</p>
        <Select
          style={{ width: "100%" }}
          defaultValue={data?.unit}
          options={unitsOptions}
          onChange={(value) => setData({ ...data, unit: value })}
        />
      </div>
      <div className="input__wrapper">
        <p>Kubikasi:</p>
        <Select
          defaultValue={data?.kubikasi}
          style={{ width: "100%" }}
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
          onChange={(value) => setData({ ...data, kubikasi: value })}
        />
      </div>
      <div className="input__wrapper">
        <p>Berat / Volume:</p>
        <InputNumber
          step="0.000001"
          stringMode
          precision={6}
          style={{ width: "100%" }}
          onChange={(value) => setData({ ...data, volumeBerat: value })}
          value={data?.volumeBerat}
        />
      </div>
      <div className="input__wrapper">
        <p>Supplier(s):</p>
        <Select
          mode="multiple"
          value={data?.supplierId}
          options={supplierOptions}
          style={{ width: "100%" }}
          onChange={(value) => setData({ ...data, supplierId: value })}
        />
      </div>
      <div className="input__wrapper">
        <p>Keterangan:</p>
        <Input
          onChange={(e) =>
            setData({ ...data, keterangan: e.currentTarget.value })
          }
          value={data?.keterangan}
        />
      </div>
    </Modal>
  );
};

export default EditModal;
