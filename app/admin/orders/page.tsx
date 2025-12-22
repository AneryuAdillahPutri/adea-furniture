'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

// Data Pesanan Palsu (Ceritanya dari Database)
const initialOrders = [
  { 
    id: "ORD-2025-001", 
    customer: "Aneryu Adillah", 
    date: "12 Des 2025", 
    total: 3500000, 
    status: "Pending", 
    items: "Interior Coffee Shop (1x)" 
  },
  { 
    id: "ORD-2025-002", 
    customer: "Joko Anwar", 
    date: "11 Des 2025", 
    total: 1250000, 
    status: "Dibayar", 
    items: "Meja Receptionist (1x)" 
  },
  { 
    id: "ORD-2025-003", 
    customer: "Siti Badriah", 
    date: "10 Des 2025", 
    total: 450000, 
    status: "Dikirim", 
    items: "Interior Dapur (1x), Lampu Gantung (2x)" 
  },
  { 
    id: "ORD-2025-004", 
    customer: "Budi Doremi", 
    date: "09 Des 2025", 
    total: 890000, 
    status: "Selesai", 
    items: "Kamar Tidur Set (1x)" 
  },
];

// Pilihan Status yang Tersedia
const statusOptions = ["Pending", "Dibayar", "Proses", "Dikirim", "Selesai", "Batal"];

// Fungsi Format Rupiah
const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("Semua");

  // Fungsi Ubah Status
  const handleStatusChange = (id: string, newStatus: string) => {
    // Update data di tabel
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    // Notifikasi keren
    Swal.fire({
      icon: 'success',
      title: 'Status Diperbarui',
      text: `Pesanan ${id} sekarang statusnya: ${newStatus}`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Fungsi Warna Badge Status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Dibayar': return 'bg-blue-100 text-blue-700';
      case 'Proses': return 'bg-indigo-100 text-indigo-700';
      case 'Dikirim': return 'bg-purple-100 text-purple-700';
      case 'Selesai': return 'bg-emerald-100 text-emerald-700';
      case 'Batal': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Filter Data
  const filteredOrders = filter === "Semua" ? orders : orders.filter(o => o.status === filter);

  return (
    <div>
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Kelola Pesanan</h2>
          <p className="text-slate-500">Pantau proses pesanan dari klien.</p>
        </div>
        
        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <span className="text-sm font-bold text-slate-500 pl-2">Filter:</span>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="Semua">Semua Pesanan</option>
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      {/* Tabel Pesanan */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-bold">ID & Tanggal</th>
                <th className="px-6 py-4 font-bold">Pelanggan</th>
                <th className="px-6 py-4 font-bold">Detail Barang</th>
                <th className="px-6 py-4 font-bold">Total</th>
                <th className="px-6 py-4 font-bold">Status Saat Ini</th>
                <th className="px-6 py-4 font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 font-mono">{order.id}</p>
                      <p className="text-xs text-slate-400">{order.date}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{order.customer}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={order.items}>
                      {order.items}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{formatRupiah(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {/* Dropdown Ganti Status */}
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-white border border-slate-300 text-slate-700 text-xs rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    Tidak ada pesanan dengan status "{filter}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}