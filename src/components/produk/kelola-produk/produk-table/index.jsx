import { useState } from "react";
import { Table, Typography, Form } from "antd";
import EditableCell from "./editable-cell";
import { useAppDispatch } from "redux/hooks";
import actions from "redux/produk/actions";

const ProdukTable = ({ originData }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const merkProdukFilters = data
    .map((datum) => {
      return {
        text: datum.merk,
        value: datum.merk,
      };
    })
    .filter(
      (v, i, a) =>
        a.findIndex((v2) => ["text", "value"].every((k) => v2[k] === v[k])) ===
        i
    );

  const namaProdukFilters = data
    .map((datum) => {
      return {
        text: datum.name,
        value: datum.name,
      };
    })
    .filter(
      (v, i, a) =>
        a.findIndex((v2) => ["text", "value"].every((k) => v2[k] === v[k])) ===
        i
    );

  const columns = [
    {
      title: "ID Produk",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Merk Produk",
      dataIndex: "merk",
      key: "merk",
      editable: true,
      filters: merkProdukFilters,
      filterSearch: true,
      onFilter: (value, record) => record.merk.includes(value),
    },
    {
      title: "Nama Produk",
      dataIndex: "name",
      key: "name",
      editable: true,
      width: 450,
      filters: namaProdukFilters,
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
    },
    {
      title: "Jenis Produk",
      dataIndex: "jenis",
      key: "jenis",
      editable: true,
    },
    {
      title: "Unit Satuan",
      dataIndex: "unit",
      key: "unit",
      editable: true,
      width: 90,
    },
    {
      title: "Kubikasi",
      dataIndex: "kubikasi",
      key: "kubikasi",
      editable: true,
      width: 150,
    },
    {
      title: "Berat / Volume",
      dataIndex: "volumeBerat",
      key: "volumeBerat",
      editable: true,
      width: 150,
    },
    {
      title: "Supplier",
      dataIndex: "supplierId",
      key: "supplierId",
      editable: true,
      width: 400,
      render: (_, record) => {
        return record.supplierId && record.supplierId.join(", ");
      },
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      fixed: "right",
      width: 70,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>Cancel</Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  function formatUndefined(obj) {
    for (var i in obj) {
      if (i === "supplierId" && obj[i] === undefined) {
        obj[i] = [];
      }
      if (obj[i] === undefined) {
        obj[i] = "";
      }
    }

    return obj;
  }

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      code: "",
      name: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        handleSaveChanges({
          ...item,
          ...formatUndefined(row),
        });
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleSaveChanges = (newData) => {
    dispatch({
      type: actions.UPDATE_PRODUK,
      payload: {
        data: newData,
      },
    });
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        rowKey="key"
        scroll={{
          x: 2000,
        }}
      />
    </Form>
  );
};

export default ProdukTable;
