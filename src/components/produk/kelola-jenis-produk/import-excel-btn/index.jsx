import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import actions from "redux/produk/actions";
import * as XLSX from "xlsx";

const ImportExcelButton = ({ jenisProduk }) => {
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

        const editedData = [
          ...new Set(
            rows.map(({ "Jenis Produk": name }) => ({
              name,
            }))
          ),
        ];

        const names = editedData.map((o) => o.name);
        const filteredData = editedData.filter(
          ({ name }, index) => !names.includes(name, index + 1)
        );

        const lastIdx = jenisProduk
          .map((jenis) => jenis.id)
          .sort(function (a, b) {
            return b - a;
          })[0];

        let counter = lastIdx ?? 0;

        for (const datum of filteredData) {
          datum["id"] = counter + 1;
          counter++;
        }

        dispatch({
          type: actions.UPDATE_JENIS_PRODUK,
          payload: {
            data: {
              jenisProduk: [...jenisProduk, ...filteredData],
            },
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
