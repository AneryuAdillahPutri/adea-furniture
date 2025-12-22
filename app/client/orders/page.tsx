'use client';

import Link from 'next/link';
import { useState } from 'react';

// 1. Data Palsu (Dummy Data) Riwayat Pesanan
const dummyOrders = [
  {
    id: "ORD-2025-001",
    date: "12 Des 2025",
    total: 3500000,
    status: "Selesai",
    items: ["Sofa Minimalis Grey (1x)"],
  },
  {
    id: "ORD-2025-002",
    date: "10 Des 2025",
    total: 1250000,
    status: "Dikirim",
    items: ["Meja Kerja Kayu Jati (1x)"],
  },
  {
    id: "ORD-2025-003",
    date: "05 Des 2025",
    total: 450000,
    status: "Menunggu Pembayaran",
    items: ["Lampu Gantung Industrial (1x)", "Tanaman Artificial (2x)"],
  },
];

// Fungsi warna-warni status
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Selesai': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Dikirim': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Menunggu Pembayaran': return 'bg-amber-100 text-amber-700 border-amber-200';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

export default function OrdersPage() {
  const [orders] = useState(dummyOrders);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Navbar Simple */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/client/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            ← Kembali
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Riwayat Pesanan</h1>
        </div>
        <div className="h-8 w-8 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-bold">A</div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Pesanan Kamu 📦</h2>
          <p className="text-slate-500 mt-1">Pantau terus status pengiriman barangmu di sini.</p>
        </div>

        {/* List Pesanan */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Baris Atas: ID & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-50 pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No. Pesanan</p>
                  <p className="font-mono font-bold text-slate-800">{order.id}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border w-fit ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>

              {/* Baris Tengah: Barang & Detail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Barang Dibeli</p>
                  <ul className="list-disc list-inside text-slate-700 text-sm font-medium space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col md:items-end">
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Belanja</p>
                   <p className="text-xl font-extrabold text-indigo-900">{formatRupiah(order.total)}</p>
                   <p className="text-xs text-slate-400 mt-1">{order.date}</p>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end pt-2">
                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Lihat Detail Tagihan &rarr;
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Kalau kosong (opsional visual) */}
        {orders.length === 0 && (
           <div className="text-center py-20">
             <p className="text-slate-400">Belum ada pesanan nih.</p>
             <Link href="/products" className="text-indigo-600 font-bold mt-2 inline-block hover:underline">Belanja Dulu Yuk!</Link>
           </div>
        )}

      </main>
    </div>
  );
}