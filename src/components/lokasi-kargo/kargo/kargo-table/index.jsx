import { useState } from "react";
import { Table, Typography, Form } from "antd";
import EditableCell from "./editable-cell";
import { useAppDispatch } from "redux/hooks";
import actions from "redux/lokasi-kargo/actions";

const KargoTable = ({ originData }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const columns = [
    {
      title: "ID Kargo",
      dataIndex: "id",
      key: "id",
      editable: true,
    },
    {
      title: "Nama Kontainer",
      dataIndex: "kontainer",
      key: "kontainer",
      editable: true,
    },
    {
      title: "Kota Keberangkatan",
      dataIndex: "from",
      key: "from",
      //   editable: true,
    },
    {
      title: "Kota Tujuan",
      dataIndex: "to",
      key: "to",
      //   editable: true,
    },
    {
      title: "Nama Ekspedisi",
      dataIndex: "ekspedisi",
      key: "ekspedisi",
      //   editable: true,
    },
    {
      title: "Harga Ongkir",
      dataIndex: "cost",
      key: "cost",
      //   editable: true,
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
          ...row,
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
      type: actions.UPDATE_KARGO,
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

export default KargoTable;
