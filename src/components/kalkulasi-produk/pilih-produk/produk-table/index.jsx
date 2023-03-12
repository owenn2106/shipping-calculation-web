import { Table } from "antd";
import _ from "lodash";

const ProdukTable = ({ data, selectedProduk, setSelectedProduk }) => {
  const columns = [
    {
      title: "ID Produk",
      dataIndex: "id",
      key: "id",
      width: 100,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Merk Produk",
      dataIndex: "merk",
      key: "merk",
      editable: true,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Nama Produk",
      dataIndex: "name",
      key: "name",
      editable: true,
      width: 450,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Jenis Produk",
      dataIndex: "jenis",
      key: "jenis",
      editable: true,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Unit Satuan",
      dataIndex: "unit",
      key: "unit",
      editable: true,
      width: 90,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Kubikasi",
      dataIndex: "kubikasi",
      key: "kubikasi",
      editable: true,
      width: 150,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Berat / Volume",
      dataIndex: "volumeBerat",
      key: "volumeBerat",
      editable: true,
      width: 150,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      editable: true,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedProduk(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedProduk,
    onChange: onSelectChange,
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </div>
  );
};

export default ProdukTable;
