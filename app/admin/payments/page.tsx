'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function PaymentValidation() {
  const [payments, setPayments] = useState<any[]>([]);

  // 1. Ambil data dari LocalStorage pas halaman dibuka
  useEffect(() => {
    const storedData = localStorage.getItem('payments');
    if (storedData) {
      setPayments(JSON.parse(storedData));
    }
  }, []);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    Swal.fire({
      title: action === 'approve' ? 'Terima Pembayaran?' : 'Tolak Pembayaran?',
      text: 'Status akan diperbarui.',
      icon: action === 'approve' ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Proses',
      confirmButtonColor: action === 'approve' ? '#059669' : '#d33',
    }).then((res) => {
      if(res.isConfirmed) {
        // Hapus dari list (Simulasi sudah diproses)
        const updated = payments.filter(p => p.id !== id);
        setPayments(updated);
        localStorage.setItem('payments', JSON.stringify(updated));
        
        Swal.fire('Berhasil', 'Data berhasil diproses.', 'success');
      }
    });
  };

  const showProof = (imageUrl: string) => {
    Swal.fire({
      title: 'Bukti Transfer',
      imageUrl: imageUrl, // INI DIA KUNCINYA! Gambar muncul disini
      imageAlt: 'Bukti Transfer',
      imageHeight: 400,
      confirmButtonText: 'Tutup'
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">💸 Validasi Pembayaran</h2>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">ID Order</th>
              <th className="px-6 py-4">Klien</th>
              <th className="px-6 py-4">Jumlah</th>
              <th className="px-6 py-4">Metode</th>
              <th className="px-6 py-4">Bukti</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400">Belum ada konfirmasi pembayaran baru.</td>
              </tr>
            ) : (
              payments.map((p: any) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 font-mono font-bold text-slate-700">{p.orderId}</td>
                  <td className="px-6 py-4">{p.client}</td>
                  <td className="px-6 py-4 font-bold">{p.amount}</td>
                  <td className="px-6 py-4 text-slate-500">{p.method}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => showProof(p.proof)} className="text-indigo-600 font-bold hover:underline">Lihat Foto</button>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button onClick={() => handleAction(p.id, 'approve')} className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 font-bold">Valid</button>
                    <button onClick={() => handleAction(p.id, 'reject')} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 font-bold">Tolak</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}