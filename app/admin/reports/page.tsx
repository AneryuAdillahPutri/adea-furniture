'use client';

import Swal from 'sweetalert2';

export default function ReportsPage() {

  const handlePrint = (type: string) => {
    Swal.fire({
      title: `Cetak ${type}?`,
      text: 'Laporan akan di-generate ke format PDF.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Download PDF',
      confirmButtonColor: '#312e81'
    }).then((res) => {
      if(res.isConfirmed) Swal.fire('Berhasil', 'File laporan sedang diunduh...', 'success');
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">📑 Pusat Laporan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Laporan Penjualan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 transition cursor-pointer group" onClick={() => handlePrint('Laporan Penjualan')}>
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">💰</div>
          <h3 className="font-bold text-lg text-slate-800">Laporan Penjualan</h3>
          <p className="text-sm text-slate-500 mt-2">Rekap transaksi masuk, omzet, dan profit per bulan.</p>
        </div>

        {/* Laporan Stok */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 transition cursor-pointer group" onClick={() => handlePrint('Laporan Stok')}>
          <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">📦</div>
          <h3 className="font-bold text-lg text-slate-800">Laporan Stok</h3>
          <p className="text-sm text-slate-500 mt-2">Sisa stok bahan baku dan barang jadi di gudang.</p>
        </div>

        {/* Laporan Produksi */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 transition cursor-pointer group" onClick={() => handlePrint('Laporan Produksi')}>
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">🔨</div>
          <h3 className="font-bold text-lg text-slate-800">Laporan Produksi</h3>
          <p className="text-sm text-slate-500 mt-2">Status pengerjaan proyek custom dan performa tim.</p>
        </div>

      </div>
    </div>
  );
}