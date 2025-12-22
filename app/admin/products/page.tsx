'use client';

import Image from 'next/image';
import Swal from 'sweetalert2';

// Data Produk (Ceritanya ini database admin)
const products = [
  { id: 1, name: "Interior Coffee Shop", price: 3500000, category: "Interior", image: "/WhatsApp Image 2025-12-12 at 6.17.08 PM.jpeg", stock: 99 },
  { id: 2, name: "Meja Receptionist", price: 1250000, category: "Office", image: "/WhatsApp Image 2025-12-12 at 6.17.09 PM (2).jpeg", stock: 5 },
  { id: 3, name: "Interior Dapur", price: 450000, category: "Interior", image: "/WhatsApp Image 2025-12-12 at 6.17.11 PM (3).jpeg", stock: 99 },
];

export default function AdminProducts() {

  const handleEdit = (name: string) => {
    Swal.fire('Edit Produk', `Fitur edit untuk ${name} akan segera hadir!`, 'info');
  };

  const handleDelete = (name: string) => {
    Swal.fire({
      title: 'Hapus Produk?',
      text: `Yakin mau menghapus ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus',
    }).then((result) => {
      if (result.isConfirmed) Swal.fire('Terhapus!', 'Produk sudah dihapus.', 'success');
    });
  };

  const handleAddProduct = () => {
    Swal.fire('Tambah Produk', 'Form tambah produk nanti kita bikin ya!', 'success');
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Kelola Produk</h2>
          <p className="text-slate-500">Daftar semua produk yang dijual.</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition"
        >
          + Tambah Produk
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-bold">Produk</th>
              <th className="px-6 py-4 font-bold">Kategori</th>
              <th className="px-6 py-4 font-bold">Harga</th>
              <th className="px-6 py-4 font-bold">Stok</th>
              <th className="px-6 py-4 font-bold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-slate-100 rounded-lg overflow-hidden relative">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <span className="font-bold text-slate-800">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{item.category}</span>
                </td>
                <td className="px-6 py-4 font-mono font-medium text-slate-700">Rp {item.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${item.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                    {item.stock} Unit
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEdit(item.name)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">✏️</button>
                    <button onClick={() => handleDelete(item.name)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}