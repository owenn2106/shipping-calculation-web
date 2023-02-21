import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import actions from "redux/produk/actions";
import * as XLSX from "xlsx";

const ImportExcelButton = () => {
  const dispatch = useAppDispatch();
  const [loadingUpdate, jenisProduk] = useAppSelector((state) => [
    state.produk.loadingUpdate,
    state.produk.jenisProduk,
  ]);

  const formatId = (newProduk, final) => {
    let formatted = undefined;
    const jenis = jenisProduk.find(
      (jenis) =>
        jenis.name.replaceAll(" ", "").toLowerCase() ===
        newProduk.jenis.replaceAll(" ", "").toLowerCase()
    );

    const merkId = (
      "XXX" + newProduk.merk.replaceAll(" ", "").slice(0, 4).toUpperCase()
    ).slice(-4);

    const jenisId = ("000" + jenis.id).slice(-4);

    const duplicateLen = final.filter(
      (el) => el.substring(0, 8) === jenisId + merkId
    ).length;

    if (duplicateLen === 0) {
      formatted = jenisId + merkId + "0001";
    } else {
      formatted = jenisId + merkId + ("000" + (duplicateLen + 1)).slice(-4);
    }

    return formatted;
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const wb = XLSX.read(event.target.result);
      const sheets = wb.SheetNames;

      if (sheets.length) {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);

        const editedData = rows.map(
          ({
            "Merk Produk": merk,
            "Jenis Produk": jenis,
            "Nama Produk": name,
            "Unit Satuan": unit,
          }) => ({ merk, jenis, name, unit })
        );

        const final = [];

        editedData.forEach((obj) => {
          obj.id = formatId(obj, final);
          final.push(formatId(obj, final));

          for (var i in obj) {
            if (obj[i] === undefined) {
              obj[i] = "";
            }
          }
        });

        dispatch({
          type: actions.BATCH_ADD_PRODUK,
          payload: {
            data: editedData,
          },
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Upload
      name="file"
      action={(file) => handleImport(file)}
      showUploadList={false}
      disabled={loadingUpdate}
    >
      {loadingUpdate ? (
        <Button loading={true}>Uploading...</Button>
      ) : (
        <Button icon={<UploadOutlined />}>Upload Excel</Button>
      )}
    </Upload>
  );
};
export default ImportExcelButton;
