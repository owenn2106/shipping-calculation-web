import { useState } from "react";
import { Button, Modal, Input } from "antd";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import actions from "redux/lokasi-kargo/actions";
import _ from "lodash";

const CardTitle = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [pelayaran, loadingUpdate] = useAppSelector((state) => [
    state.lokasiKargo.pelayaran,
    state.lokasiKargo.loadingUpdate,
  ]);

  const initialState = {
    id: "",
    name: "",
  };

  const [newPelayaran, setNewPelayaran] = useState(initialState);

  const handleOk = () => {
    const newData = [...pelayaran, newPelayaran];

    dispatch({
      type: actions.UPDATE_PELAYARAN,
      payload: {
        data: { pelayaran: newData.map(({ key, ...keepAttrs }) => keepAttrs) },
      },
    });

    setNewPelayaran(initialState);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewPelayaran(initialState);
  };
  return (
    <>
      <Modal
        title="Input Kapal"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          disabled: _.isEqual(newPelayaran, initialState),
          loading: loadingUpdate,
        }}
      >
        <div className="input__wrapper">
          <p>ID Kapal:</p>
          <Input
            placeholder="ID Kapal..."
            value={newPelayaran.id}
            onChange={(e) =>
              setNewPelayaran({ ...newPelayaran, id: e.currentTarget.value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Nama Kapal:</p>
          <Input
            placeholder="Nama Kapal..."
            value={newPelayaran.name}
            onChange={(e) =>
              setNewPelayaran({ ...newPelayaran, name: e.currentTarget.value })
            }
          />
        </div>
      </Modal>
      <div className={style.card__title__content}>
        <h3 style={{ padding: "16px 0" }}>Kelola Pelayaran</h3>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Input Kapal
        </Button>
      </div>
    </>
  );
};

export default CardTitle;
