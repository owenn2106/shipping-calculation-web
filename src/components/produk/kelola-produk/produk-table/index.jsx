import { useState, useCallback, useEffect } from "react";
import { Typography, Table, Input } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import supplierActions from "redux/supplier/actions";
import _ from "lodash";
import EditModal from "./edit-modal";
import Fuse from "fuse.js";

const ProdukTable = ({ originData }) => {
  const dispatch = useAppDispatch();
  const [suppliers] = useAppSelector((state) => [state.supplier.suppliers]);
  const [data, setData] = useState(originData);
  const [editRecord, setEditRecord] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch({
      type: supplierActions.GET_SUPPLIER,
    });
  }, [dispatch]);

  useEffect(() => {
    const results = [...filterProduk()];
    setData(results);
    setSearchQuery(searchQuery);

    // eslint-disable-next-line
  }, [originData, searchQuery]);

  const fuse = new Fuse(originData, {
    keys: ["name", "merk"],
    threshold: 0.4,
    includeScore: true,
  });

  function filterProduk() {
    return searchQuery === ""
      ? originData
      : fuse.search(searchQuery).map((i) => i.item);
  }

  const getSupplier = useCallback(
    (supplierId) => {
      const supplier = suppliers.find((x) => x.id === supplierId);
      return supplier ? supplier.name : supplierId;
    },
    [suppliers]
  );

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
      title: "Supplier",
      dataIndex: "supplierId",
      key: "supplierId",
      editable: true,
      width: 400,
      render: (_, record) => {
        if (!record.supplierId) return null;
        const formattedRecord = record.supplierId.map((id) => getSupplier(id));
        return formattedRecord.join(", ");
      },
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      editable: true,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
    },
    {
      title: "Actions",
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      shouldCellUpdate: (record, prevRecord) => !_.isEqual(record, prevRecord),
      render: (_, record) => {
        return (
          <Typography.Link
            onClick={() => {
              setEditRecord(record);
              setModalOpen(true);
            }}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <>
      <EditModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        editRecord={editRecord}
        setEditRecord={setEditRecord}
      />
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <p style={{ margin: 0, paddingRight: 10 }}>Cari Produk:</p>
        <Input
          style={{ width: "50%" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </div>
      <Table
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey="key"
        scroll={{
          x: 2000,
        }}
      />
    </>
  );
};

export default ProdukTable;
