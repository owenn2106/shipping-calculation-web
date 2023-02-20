import { useState } from "react";
import { Button, Modal, Input } from "antd";
import style from "./index.module.scss";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import actions from "redux/produk/actions";
import _ from "lodash";
import ImportExcelButton from "../import-excel-btn";

const CardTitle = ({ jenisProduk }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loadingUpdate] = useAppSelector((state) => [
    state.produk.loadingUpdate,
  ]);

  const [newJenis, setNewJenis] = useState("");

  const handleOk = () => {
    const lastIdx = jenisProduk
      .map((jenis) => jenis.id)
      .sort(function (a, b) {
        return b - a;
      })[0];

    const newData = [
      ...jenisProduk,
      {
        id: lastIdx ? lastIdx + 1 : 1,
        name: newJenis,
      },
    ];

    dispatch({
      type: actions.UPDATE_JENIS_PRODUK,
      payload: {
        data: {
          jenisProduk: newData,
        },
      },
    });

    setNewJenis("");
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setNewJenis("");
  };

  return (
    <>
      <Modal
        title="Input Jenis Produk"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          disabled: _.isEqual(newJenis, ""),
          loading: loadingUpdate,
        }}
      >
        <div className="input__wrapper">
          <p>Jenis Produk:</p>
          <Input
            placeholder="Jenis Produk..."
            value={newJenis}
            onChange={(e) => setNewJenis(e.currentTarget.value)}
          />
        </div>
      </Modal>
      <div className={style.card__title__content}>
        <h3 style={{ padding: "16px 0" }}>Kelola Jenis Produk</h3>
        <div className={style.action__btn__wrapper}>
          <ImportExcelButton jenisProduk={jenisProduk} />
          <Button
            type="primary"
            onClick={() => setModalOpen(true)}
            style={{ marginLeft: "20px" }}
          >
            Input Jenis Produk
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardTitle;
