import { useState } from "react";
import { Button, Modal, Input, Select, InputNumber } from "antd";
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
    cost: {
      value: 0,
      date: null,
    },
    extraCost: {
      value: 0,
      date: null,
    },
  };

  const keberangkatanOptions = [
    { label: "Pilih Kota Keberangkatan", value: "", disabled: true },
    ...lokasi.map((obj) => ({
      label: obj.name,
      value: obj.id,
    })),
  ];

  const tujuanOptions = [
    { label: "Pilih Kota Tujuan", value: "", disabled: true },
    ...lokasi.map((obj) => ({
      label: obj.name,
      value: obj.id,
    })),
  ];

  const [newEkspedisi, setNewEkspedisi] = useState(initialState);

  const handleOk = () => {
    setNewEkspedisi({
      ...newEkspedisi,
      cost: {
        ...newEkspedisi.cost,
        date: new Date(),
      },
      extraCost: {
        ...newEkspedisi.extraCost,
        date: new Date(),
      },
    });

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
            options={keberangkatanOptions}
            onChange={(value) =>
              setNewEkspedisi({ ...newEkspedisi, from: value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Kota Tujuan:</p>
          <Select
            value={newEkspedisi.to}
            options={tujuanOptions}
            onChange={(value) =>
              setNewEkspedisi({ ...newEkspedisi, to: value })
            }
          />
        </div>
        <div className="input__wrapper">
          <p>Harga Ongkir (Rupiah):</p>
          <InputNumber
            value={newEkspedisi.cost}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(value) =>
              setNewEkspedisi({
                ...newEkspedisi,
                cost: {
                  value: value,
                  ...newEkspedisi.cost,
                },
              })
            }
            style={{ width: 200 }}
          />
        </div>
        <div className="input__wrapper">
          <p>Ongkir Lain-lain:</p>
          <InputNumber
            value={newEkspedisi.extraCost}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(value) =>
              setNewEkspedisi({
                ...newEkspedisi,
                extraCost: {
                  value: value,
                  ...newEkspedisi.extraCost,
                },
              })
            }
            style={{ width: 200 }}
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
