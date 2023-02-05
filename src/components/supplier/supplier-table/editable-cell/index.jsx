import { useEffect } from "react";
import { Form, Input, InputNumber, Select } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import lokasiKargoActions from "redux/lokasi-kargo/actions";

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
  const [lokasi] = useAppSelector((state) => [state.lokasiKargo.lokasi]);

  useEffect(() => {
    dispatch({
      type: lokasiKargoActions.GET_LOKASI,
    });
  }, [dispatch]);

  const lokasiOptions = lokasi.map((obj) => ({
    label: obj.name,
    value: obj.id,
  }));

  const inputNode =
    dataIndex === "location" ? (
      <Select value={record.location} options={lokasiOptions} />
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
