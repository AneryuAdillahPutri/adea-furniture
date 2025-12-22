'use client';

import Link from 'next/link';

// Data Dummy Pesanan Klien
const myOrders = [
  { id: "ORD-001", date: "12 Des 2025", total: "Rp 3.500.000", status: "Pending", items: "Interior Coffee Shop" },
  { id: "ORD-002", date: "10 Des 2025", total: "Rp 890.000", status: "Dikirim", items: "Kamar Tidur Set" },
];

export default function ClientOrders() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/client/dashboard" className="text-slate-500 hover:text-indigo-900 font-bold">← Kembali</Link>
          <h1 className="text-2xl font-bold text-slate-800">Riwayat Pesanan Saya</h1>
        </div>

        <div className="space-y-4">
          {myOrders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-slate-800 text-lg">{order.items}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500">ID: <span className="font-mono">{order.id}</span> • {order.date}</p>
                <p className="font-bold text-indigo-900 mt-2">{order.total}</p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                 {/* Tombol DETAIL (Menjawab Q3) */}
                <Link href={`/client/orders/${order.id}`} className="flex-1 md:flex-none px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold text-center hover:bg-slate-50">
                  Lihat Detail
                </Link>

                {/* Tombol BAYAR (Menjawab Q2) - Hanya muncul kalau Pending */}
                {order.status === 'Pending' && (
                  <Link href={`/client/payment?orderId=${order.id}`} className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold text-center hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">
                    Upload Bukti Bayar
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}