import { useState, useEffect } from "react";
import { Button, Input, DatePicker, Select } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import actions from "redux/lokasi-kargo/actions";
import style from "./index.module.scss";

const InputNota = ({ selectedProduk }) => {
  const dispatch = useAppDispatch();
  const [kargo] = useAppSelector((state) => [state.lokasiKargo.kargo]);
  const initialState = {
    kargo: {},
    tanggalKapal: "",
    bl: "",
    noKontainer: "",
    tanggalNota: "",
    noInvoice: "",
    produk: [],
  };
  const [nota, setNota] = useState(initialState);

  useEffect(() => {
    dispatch({
      type: actions.GET_KARGO,
    });
  }, [dispatch]);

  useEffect(() => {
    setNota({ ...nota, produk: selectedProduk });

    // eslint-disable-next-line
  }, [selectedProduk]);

  const kargoOptions = kargo.map((obj) => ({
    value: obj.id,
    label: `${obj.ekspedisi} | ${obj.kontainer} | ${obj.from} - ${obj.to}`,
  }));

  return (
    <div>
      <h3>Input Nota</h3>
      <h4>Nota Kapal</h4>
      <div className={style.row}>
        <div className={style.column}>
          <div className="input__wrapper">
            <p>Kargo:</p>
            <Select
              style={{ width: "100%" }}
              options={kargoOptions}
              onChange={(value) =>
                setNota({
                  ...nota,
                  kargo: kargo.find((obj) => obj.id === value),
                })
              }
            />
          </div>

          <div className="input__wrapper">
            <p>Kapal:</p>
            <Select
              style={{ width: "100%" }}
              disabled
              value={
                nota.kargo.kontainer ? nota.kargo.kontainer : "Pilih Kargo"
              }
            />
          </div>

          <div className="input__wrapper">
            <p>Tanggal Kapal:</p>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(_, dateString) =>
                setNota({ ...nota, tanggalKapal: dateString })
              }
            />
          </div>
        </div>
        <div className={style.column}>
          <div className="input__wrapper">
            <p>BL:</p>
            <Input
              onChange={(e) => setNota({ ...nota, bl: e.currentTarget.value })}
            />
          </div>

          <div className="input__wrapper">
            <p>No. Kontainer:</p>
            <Input
              onChange={(e) =>
                setNota({ ...nota, noKontainer: e.currentTarget.value })
              }
            />
          </div>
        </div>
      </div>
      <h4>Nota Produk</h4>
      <div className={style.row}>
        <div className={style.column}>
          <div className="input__wrapper">
            <p>Tanggal Nota:</p>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(_, dateString) =>
                setNota({ ...nota, tanggalNota: dateString })
              }
            />
          </div>
        </div>
        <div className={style.column}>
          <div className="input__wrapper">
            <p>No. Invoice:</p>
            <Input
              onChange={(e) =>
                setNota({ ...nota, noInvoice: e.currentTarget.value })
              }
            />
          </div>
        </div>
      </div>

      <div className={style.save__btn}>
        <Button style={{ width: "100%" }} type="primary">
          Simpan Nota
        </Button>
      </div>
    </div>
  );
};

export default InputNota;
