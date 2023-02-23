import { useEffect } from "react";
import { Form, Input, InputNumber, Select } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ITEM_UNITS } from "utils/constant";
import supplierActions from "redux/supplier/actions";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const dispatch = useAppDispatch();
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

  const inputNode =
    dataIndex === "jenis" ? (
      <Select defaultValue={record.jenis} options={jenisProdukOptions} />
    ) : dataIndex === "unit" ? (
      <Select defaultValue={record.unit} options={unitsOptions} />
    ) : dataIndex === "kubikasi" ? (
      <Select
        defaultValue={record.kubikasi}
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
      />
    ) : dataIndex === "supplierId" ? (
      <Select
        mode="multiple"
        value={record.supplierId}
        options={supplierOptions}
      />
    ) : dataIndex === "volumeBerat" ? (
      <InputNumber
        step="0.000001"
        stringMode
        precision={7}
        style={{ width: "100%" }}
      />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          // rules={[
          //   {
          //     required: true,
          //     message: `Please Input ${title}!`,
          //   },
          // ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
