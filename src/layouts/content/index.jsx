import Dashboard from "../../pages/dashboard";
import KalkulasiProduk from "../../pages/kalkulasi-produk";
import Produk from "../../pages/produk";
import Supplier from "../../pages/supplier";
import LokasiKargo from "../../pages/lokasi-kargo";
import Aktivitas from "../../pages/aktivitas";
import Settings from "../../pages/settings";
import { Routes, Route } from "react-router-dom";

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} exact />
      <Route path="/kalkulasi-produk" element={<KalkulasiProduk />} exact />
      <Route path="/produk" element={<Produk />} exact />
      <Route path="/supplier" element={<Supplier />} exact />
      <Route path="/lokasi-kargo" element={<LokasiKargo />} exact />
      <Route path="/aktivitas" element={<Aktivitas />} exact />
      <Route path="/settings" element={<Settings />} exact />
    </Routes>
  );
};

export default AppContent;
