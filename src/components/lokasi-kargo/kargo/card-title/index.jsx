import { useState } from "react";
import { Button, Modal, Input, Select, InputNumber } from "antd";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import actions from "redux/lokasi-kargo/actions";
import _ from "lodash";

const CardTitle = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingUpdate, lokasi, ekspedisi, pelayaran] = useAppSelector(
    (state) => [
      state.lokasiKargo.loadingUpdate,
      state.lokasiKargo.lokasi,
      state.lokasiKargo.ekspedisi,
      state.lokasiKargo.pelayaran,
    ]
  );

  const initialState = {
    id: "",
    kontainer: "",
    from: "",
    to: "",
    ekspedisi: "",
    cost: 0,
  };

  const kapalOptions = [
    { label: "Pilih Kapal", value: "", disabled: true },
    ...pelayaran.map((obj) => ({
      label: obj.name,
      value: obj.id,
    })),
  ];

  const cityOptions = [
    { label: "Pilih Kota Keberangkatan", value: "", disabled: true },
    ...lokasi.map((obj) => ({
      label: obj.name,
      value: obj.id,
    })),
  ];

  const ekspedisiOptions = [
    { label: "Pilih Ekspedisi", value: "", disabled: true },
    ...ekspedisi.map((obj) => ({
      label: obj.name,
      value: obj.id,
    })),
  ];

  const [newKargo, setNewKargo] = useState(initialState);

  const handleOk = () => {
    dispatch({
      type: actions.ADD_KARGO,
      payload: {
        data: newKargo,
      },
    });

    setNewKargo(initialState);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewKargo(initialState);
  };
  return (
    <>
      <Modal
        title="Input Kargo"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          disabled: _.isEqual(newKargo, initialState),
          loading: loadingUpdate,
        }}
      >
        <div className="input__wrapper">
          <p>ID Kargo:</p>
          <Input
            placeholder="ID Kargo..."
            value={newKargo.id}
            onChange={(e) =>
              setNewKargo({ ...newKargo, id: e.currentTarget.value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Nama Kontainer:</p>
          <Select
            value={newKargo.kontainer}
            options={kapalOptions}
            onChange={(value) => setNewKargo({ ...newKargo, kontainer: value })}
            style={{ width: 200 }}
          />
        </div>
        <div className="input__wrapper">
          <p>Kota Keberangkatan:</p>
          <Select
            value={newKargo.from}
            options={cityOptions}
            onChange={(value) => setNewKargo({ ...newKargo, from: value })}
          />
        </div>
        <div className="input__wrapper">
          <p>Kota Tujuan:</p>
          <Select
            value={newKargo.to}
            options={cityOptions}
            onChange={(value) => setNewKargo({ ...newKargo, to: value })}
          />
        </div>
        <div className="input__wrapper">
          <p>Nama Ekspedisi:</p>
          <Select
            value={newKargo.ekspedisi}
            options={ekspedisiOptions}
            onChange={(value) => setNewKargo({ ...newKargo, ekspedisi: value })}
          />
        </div>
        <div className="input__wrapper">
          <p>Harga Ongkir (Rupiah):</p>
          <InputNumber
            value={newKargo.cost}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(value) => setNewKargo({ ...newKargo, cost: value })}
            style={{ width: 200 }}
          />
        </div>
      </Modal>
      <div className={style.card__title__content}>
        <h3 style={{ padding: "16px 0" }}>Kelola Kargo</h3>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Input Kargo
        </Button>
      </div>
    </>
  );
};

export default CardTitle;
