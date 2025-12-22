'use client';

import Swal from 'sweetalert2';

// Data Stok Bahan Baku (Bukan Barang Jadi)
const rawMaterials = [
  { id: "M-001", name: "Kayu Jati Solid (Grade A)", stock: 120, unit: "Batang", min: 50 },
  { id: "M-002", name: "Multiplek 18mm", stock: 15, unit: "Lembar", min: 20 }, // Stok menipis
  { id: "M-003", name: "Cat Duco Putih", stock: 45, unit: "Kaleng", min: 10 },
  { id: "M-004", name: "HPL Taco Woodgrain", stock: 8, unit: "Lembar", min: 10 }, // Stok menipis
];

export default function InventoryDashboard() {

  const handleRestock = (name: string) => {
    Swal.fire({
      title: `Restock ${name}`,
      text: 'Masukkan jumlah pembelian baru:',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Catat Pembelian',
      confirmButtonColor: '#059669',
    }).then((result) => {
      if (result.isConfirmed) Swal.fire('Tercatat!', 'Stok berhasil ditambahkan.', 'success');
    });
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">🏭 Gudang Bahan Baku</h2>
          <p className="text-slate-500">Manajemen stok material produksi (Kayu, Cat, HPL).</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow hover:bg-indigo-700">
          + Bahan Baru
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">ID Material</th>
              <th className="px-6 py-4">Nama Bahan</th>
              <th className="px-6 py-4">Sisa Stok</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {rawMaterials.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-slate-400">{item.id}</td>
                <td className="px-6 py-4 font-bold text-slate-700">{item.name}</td>
                <td className="px-6 py-4">
                  <span className="font-bold text-lg">{item.stock}</span> {item.unit}
                </td>
                <td className="px-6 py-4">
                  {item.stock < item.min ? (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold animate-pulse">
                      ⚠️ Stok Menipis
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                      Aman
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => handleRestock(item.name)}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    + Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}