import {
  DashboardOutlined,
  DropboxOutlined,
  CalculatorOutlined,
  ExportOutlined,
  CarOutlined,
  CodeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "produk",
    label: "Produk",
    icon: <DropboxOutlined />,
  },
  {
    key: "kalkulasi-produk",
    label: "Kalkulasi Produk",
    icon: <CalculatorOutlined />,
  },
  {
    key: "supplier",
    label: "Supplier",
    icon: <ExportOutlined />,
  },
  {
    key: "lokasi-kargo",
    label: "Lokasi & Kargo",
    icon: <CarOutlined />,
  },
  {
    key: "aktivitas",
    label: "Aktivitas",
    icon: <CodeOutlined />,
  },
  {
    key: "settings",
    label: "Akun & Settings",
    icon: <SettingOutlined />,
  },
];

export const ITEM_UNITS = [
  "kg",
  "lbr",
  "rol",
  "pcs",
  "bh",
  "bj",
  "bks",
  "btg",
  "btl",
  "dus",
  "gln",
  "klg",
  "ktk",
  "lsn",
  "m1",
  "pak",
  "peil",
  "peti",
  "psg",
  "sak",
  "set",
  "tub",
  "unit",
];
