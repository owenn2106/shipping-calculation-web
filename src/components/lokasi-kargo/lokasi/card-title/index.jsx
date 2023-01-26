import { useState } from "react";
import { Button, Modal, Input } from "antd";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import actions from "redux/lokasi-kargo/actions";
import _ from "lodash";

const CardTitle = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [lokasi, loadingUpdate] = useAppSelector((state) => [
    state.lokasiKargo.lokasi,
    state.lokasiKargo.loadingUpdate,
  ]);

  const initialState = {
    id: "",
    name: "",
  };

  const [newLokasi, setNewLokasi] = useState(initialState);

  const handleOk = () => {
    const newData = [...lokasi, newLokasi];

    dispatch({
      type: actions.UPDATE_LOKASI,
      payload: {
        data: { lokasi: newData },
      },
    });

    setNewLokasi(initialState);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewLokasi(initialState);
  };
  return (
    <>
      <Modal
        title="Input Lokasi"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          disabled: _.isEqual(newLokasi, initialState),
          loading: loadingUpdate,
        }}
      >
        <div className="input__wrapper">
          <p>ID Lokasi:</p>
          <Input
            placeholder="ID Lokasi..."
            value={newLokasi.id}
            onChange={(e) =>
              setNewLokasi({ ...newLokasi, id: e.currentTarget.value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Nama Lokasi:</p>
          <Input
            placeholder="Nama Lokasi..."
            value={newLokasi.name}
            onChange={(e) =>
              setNewLokasi({ ...newLokasi, name: e.currentTarget.value })
            }
          />
        </div>
      </Modal>
      <div className={style.card__title__content}>
        <h3 style={{ padding: "16px 0" }}>Kelola Lokasi</h3>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Input Lokasi
        </Button>
      </div>
    </>
  );
};

export default CardTitle;
