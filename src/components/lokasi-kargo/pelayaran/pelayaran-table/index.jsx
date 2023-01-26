import { useState } from "react";
import { Table, Typography, Form, Button } from "antd";
import EditableCell from "./editable-cell";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import actions from "redux/lokasi-kargo/actions";

const PelayaranTable = ({ originData }) => {
  const dispatch = useAppDispatch();
  const [loadingUpdate] = useAppSelector((state) => [
    state.lokasiKargo.loadingUpdate,
  ]);
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const columns = [
    {
      title: "ID Kapal",
      dataIndex: "id",
      key: "id",
      editable: true,
    },
    {
      title: "Nama Kapal",
      dataIndex: "name",
      key: "name",
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

  const handleApplyChanges = () => {
    const newData = data.map(({ key, ...keepAttrs }) => keepAttrs);
    dispatch({
      type: actions.UPDATE_PELAYARAN,
      payload: {
        data: {
          pelayaran: newData,
        },
      },
    });
  };

  return (
    <Form form={form} component={false}>
      {!_.isEqual(originData, data) && (
        <Button
          loading={loadingUpdate}
          onClick={handleApplyChanges}
          style={{ width: "100%", marginBottom: "1em" }}
        >
          Apply Changes
        </Button>
      )}
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

export default PelayaranTable;
