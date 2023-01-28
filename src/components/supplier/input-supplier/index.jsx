import { useState, useEffect } from "react";
import { Modal, Button, Input, Select } from "antd";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import lokasiKargoActions from "redux/lokasi-kargo/actions";
import supplierActions from "redux/supplier/actions";
import _ from "lodash";

const InputSupplier = () => {
  const dispatch = useAppDispatch();
  const [isInputSupplierOpen, setInputSupplierOpen] = useState(false);
  const [loadingUpdate, lokasi] = useAppSelector((state) => [
    state.supplier.loadingUpdate,
    state.lokasiKargo.lokasi,
  ]);

  const initialState = {
    id: "",
    name: "",
    location: "",
  };

  const [newSupplier, setNewSupplier] = useState(initialState);

  useEffect(() => {
    dispatch({
      type: lokasiKargoActions.GET_LOKASI,
    });
  }, [dispatch]);

  const cityOptions = [
    { label: "Pilih Lokasi", value: "", disabled: true },
    ...lokasi.map((obj) => ({
      label: obj.name,
      value: obj.id,
    })),
  ];

  const handleOk = () => {
    dispatch({
      type: supplierActions.ADD_SUPPLIER,
      payload: {
        data: newSupplier,
      },
    });

    setNewSupplier(initialState);
    setInputSupplierOpen(false);
  };

  const handleCancel = () => {
    setInputSupplierOpen(false);
    setNewSupplier(initialState);
  };

  return (
    <>
      <Modal
        title="Input Data Supplier"
        open={isInputSupplierOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: _.isEqual(newSupplier, initialState),
          loading: loadingUpdate,
        }}
      >
        <div className={style.modal__content}>
          <div style={{ marginRight: "1.5em" }}>
            <h3>Supplier</h3>
            <p>
              Pengelolaan Data Supplier wajib disesuikan dengan data-data yang
              dibutuhkan aplikasi untuk mencegah miskalkulasi.
            </p>
          </div>
          <div>
            <div className="input__wrapper">
              <p>ID:</p>
              <Input
                placeholder="Supplier ID..."
                value={newSupplier.id}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, id: e.currentTarget.value })
                }
              />
            </div>
            <div className="input__wrapper">
              <p>Nama:</p>
              <Input
                placeholder="Nama Supplier..."
                value={newSupplier.name}
                onChange={(e) =>
                  setNewSupplier({
                    ...newSupplier,
                    name: e.currentTarget.value,
                  })
                }
              />
            </div>
            <div className="input__wrapper">
              <p>Lokasi Supplier:</p>
              <Select
                value={newSupplier.location}
                options={cityOptions}
                onChange={(value) =>
                  setNewSupplier({ ...newSupplier, location: value })
                }
                style={{ width: 200 }}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div>
        <Button type="primary" onClick={() => setInputSupplierOpen(true)}>
          Input Supplier
        </Button>
      </div>
    </>
  );
};

export default InputSupplier;
