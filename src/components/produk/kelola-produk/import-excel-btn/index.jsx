import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import actions from "redux/produk/actions";
import * as XLSX from "xlsx";

const ImportExcelButton = () => {
  const dispatch = useAppDispatch();
  const [loadingUpdate] = useAppSelector((state) => [
    state.produk.loadingUpdate,
  ]);

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const wb = XLSX.read(event.target.result);
      const sheets = wb.SheetNames;

      if (sheets.length) {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);

        const editedData = rows.map(
          ({
            "Kategori Barang": jenis,
            "Nama Barang": name,
            Satuan: unit,
          }) => ({ jenis, name, unit })
        );

        editedData.forEach(function (obj) {
          for (var i in obj) {
            if (obj[i] === undefined) {
              obj[i] = "";
            }
          }
        });

        if (editedData.length >= 500) {
          while (editedData.length > 0) {
            dispatch({
              type: actions.BATCH_ADD_PRODUK,
              payload: {
                data: editedData.splice(0, 500),
              },
            });
          }
        } else {
          dispatch({
            type: actions.BATCH_ADD_PRODUK,
            payload: {
              data: editedData,
            },
          });
        }
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
