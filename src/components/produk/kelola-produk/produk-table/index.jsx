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

  const supplierFilterOptions = data
    .map((datum) => {
      return {
        text: datum.supplierId,
        value: datum.supplierId,
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
      title: "Nama Produk",
      dataIndex: "name",
      key: "name",
      editable: true,
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
    },
    {
      title: "Kubikasi",
      dataIndex: "kubikasi",
      key: "kubikasi",
      editable: true,
    },
    {
      title: "Berat / Volume",
      dataIndex: "volumeBerat",
      key: "volumeBerat",
      editable: true,
    },
    {
      title: "Supplier",
      dataIndex: "supplierId",
      key: "supplierId",
      editable: true,
      filters: supplierFilterOptions,
      filterSearch: true,
      onFilter: (value, record) => record.supplierId?.includes(value),
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
      />
    </Form>
  );
};

export default ProdukTable;
