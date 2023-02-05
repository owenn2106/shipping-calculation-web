import { Form, Input, InputNumber, Select } from "antd";
import { useAppSelector } from "redux/hooks";

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
  const [lokasi] = useAppSelector((state) => [state.lokasiKargo.lokasi]);

  const lokasiOptions = lokasi.map((obj) => ({
    label: obj.name,
    value: obj.id,
  }));

  const inputNode =
    dataIndex === "from" ? (
      <Select value={record.from} options={lokasiOptions} />
    ) : dataIndex === "to" ? (
      <Select value={record.to} options={lokasiOptions} />
    ) : inputType === "number" ? (
      <InputNumber />
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
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
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
