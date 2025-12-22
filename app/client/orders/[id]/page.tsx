'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetail() {
  const params = useParams(); // Ambil ID pesanan

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg p-8 rounded-[2rem] shadow-xl border border-slate-100 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Detail Tagihan</h2>
        <p className="text-slate-500 text-sm mb-6">ID Pesanan: <span className="font-mono font-bold">{params.id}</span></p>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Interior Coffee Shop (Custom)</span>
            <span className="font-bold text-slate-800">Rp 3.500.000</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Jasa Desain & Instalasi</span>
            <span className="font-bold text-slate-800">Rp 500.000</span>
          </div>
          <div className="flex justify-between py-4 text-lg">
            <span className="font-bold text-indigo-900">Total Tagihan</span>
            <span className="font-extrabold text-indigo-900">Rp 4.000.000</span>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-6">
          <p className="text-yellow-800 text-xs font-bold uppercase mb-1">Status Pembayaran</p>
          <p className="text-yellow-600 font-bold">Menunggu Pembayaran</p>
        </div>

        <Link href="/client/orders" className="block w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-center hover:bg-slate-200">
          Kembali
        </Link>
      </div>
    </div>
  );
}