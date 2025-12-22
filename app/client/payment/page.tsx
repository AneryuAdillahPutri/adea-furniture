'use client';

import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Komponen Form biar aman di Next.js
function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi Upload
    Swal.fire({
      title: 'Berhasil Upload! 🎉',
      text: 'Admin akan mengecek pembayaranmu dalam 1x24 jam.',
      icon: 'success',
      confirmButtonColor: '#312e81'
    }).then(() => {
      router.push('/client/orders');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">ID Pesanan</label>
        <input type="text" value={orderId || ''} disabled className="w-full px-4 py-3 bg-slate-100 rounded-xl font-mono text-slate-500" />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Transfer Ke Bank Mana?</label>
        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
          <option>BCA - 1234567890 (Adea Interior)</option>
          <option>Mandiri - 0987654321 (Adea Interior)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Upload Bukti Transfer</label>
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50">
          <span className="text-2xl">📸</span>
          <p className="text-sm font-bold text-slate-500 mt-2">Klik untuk ambil foto / upload file</p>
          <input type="file" required className="opacity-0 absolute inset-0 cursor-pointer" />
        </div>
      </div>

      <button type="submit" className="w-full py-4 bg-indigo-900 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-800">
        Kirim Konfirmasi 🚀
      </button>
    </form>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-xl border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">Konfirmasi Pembayaran</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentForm />
        </Suspense>
      </div>
    </div>
  );
}