import { useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import actions from "redux/lokasi-kargo/actions";
import _ from "lodash";

const CardTitle = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingUpdate, lokasi] = useAppSelector((state) => [
    state.lokasiKargo.loadingUpdate,
    state.lokasiKargo.lokasi,
  ]);

  const initialState = {
    id: "",
    name: "",
    from: "",
    to: "",
  };

  const cityOptions = [
    { label: "Pilih Kota Keberangkatan", value: "", disabled: true },
    ...lokasi.map((obj) => ({
      label: obj.name,
      value: obj.id,
    })),
  ];

  const [newEkspedisi, setNewEkspedisi] = useState(initialState);

  const handleOk = () => {
    dispatch({
      type: actions.ADD_EKSPEDISI,
      payload: {
        data: newEkspedisi,
      },
    });

    setNewEkspedisi(initialState);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewEkspedisi(initialState);
  };
  return (
    <>
      <Modal
        title="Input Ekspedisi"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          disabled: _.isEqual(newEkspedisi, initialState),
          loading: loadingUpdate,
        }}
      >
        <div className="input__wrapper">
          <p>ID Ekspedisi:</p>
          <Input
            placeholder="ID Ekspedisi..."
            value={newEkspedisi.id}
            onChange={(e) =>
              setNewEkspedisi({ ...newEkspedisi, id: e.currentTarget.value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Nama Ekspedisi:</p>
          <Input
            placeholder="Nama Ekspedisi..."
            value={newEkspedisi.name}
            onChange={(e) =>
              setNewEkspedisi({ ...newEkspedisi, name: e.currentTarget.value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Kota Keberangkatan:</p>
          <Select
            value={newEkspedisi.from}
            options={cityOptions}
            onChange={(value) =>
              setNewEkspedisi({ ...newEkspedisi, from: value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Kota Tujuan:</p>
          <Select
            value={newEkspedisi.to}
            options={cityOptions}
            onChange={(value) =>
              setNewEkspedisi({ ...newEkspedisi, to: value })
            }
          />
        </div>
      </Modal>
      <div className={style.card__title__content}>
        <h3 style={{ padding: "16px 0" }}>Kelola Ekspedisi</h3>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Input Ekspedisi
        </Button>
      </div>
    </>
  );
};

export default CardTitle;
