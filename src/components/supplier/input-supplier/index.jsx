import { useState } from "react";
import { Modal, Button, Input } from "antd";
import style from "./index.module.scss";

const InputSupplier = () => {
  const [isInputSupplierOpen, setInputSupplierOpen] = useState(false);

  const handleSave = () => {};

  const handleCancel = () => {
    setInputSupplierOpen(false);
  };

  return (
    <>
      <Modal
        title="Input Data Supplier"
        open={isInputSupplierOpen}
        onOk={handleSave}
        onCancel={handleCancel}
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
              <Input placeholder="Supplier ID..." />
            </div>
            <div className="input__wrapper">
              <p>Nama:</p>
              <Input placeholder="Nama Supplier..." />
            </div>
            <div className="input__wrapper">
              <p>Lokasi Supplier:</p>
              <Input placeholder="Lokasi Supplier..." />
            </div>
          </div>
        </div>
      </Modal>
      <div>
        <Button
          type="primary"
          size="large"
          onClick={() => setInputSupplierOpen(true)}
        >
          Input Supplier
        </Button>
      </div>
    </>
  );
};

export default InputSupplier;
