'use client';

import Swal from 'sweetalert2';

// Data Pembayaran Pending
const payments = [
  { id: "PAY-001", orderId: "ORD-002", client: "Siti Aminah", amount: "Rp 1.250.000", date: "12 Des 2025", method: "Transfer BCA" },
];

export default function PaymentValidation() {

  const handleAction = (action: 'approve' | 'reject') => {
    Swal.fire({
      title: action === 'approve' ? 'Terima Pembayaran?' : 'Tolak Pembayaran?',
      text: action === 'approve' ? 'Status pesanan akan berubah jadi "Dibayar".' : 'Pesanan akan dibatalkan.',
      icon: action === 'approve' ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Proses',
      confirmButtonColor: action === 'approve' ? '#059669' : '#d33',
    }).then((res) => {
      if(res.isConfirmed) Swal.fire('Berhasil', 'Status pembayaran diperbarui.', 'success');
    });
  };

  const showProof = () => {
    Swal.fire({
      title: 'Bukti Transfer',
      imageUrl: 'https://via.placeholder.com/300x500?text=Bukti+Transfer', // Placeholder gambar
      imageAlt: 'Bukti Transfer',
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
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 font-mono font-bold text-slate-700">{p.orderId}</td>
                <td className="px-6 py-4">{p.client}</td>
                <td className="px-6 py-4 font-bold">{p.amount}</td>
                <td className="px-6 py-4 text-slate-500">{p.method}</td>
                <td className="px-6 py-4">
                  <button onClick={showProof} className="text-indigo-600 font-bold hover:underline">Lihat Foto</button>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  <button onClick={() => handleAction('approve')} className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 font-bold">Valid</button>
                  <button onClick={() => handleAction('reject')} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 font-bold">Tolak</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && <p className="p-8 text-center text-slate-500">Tidak ada pembayaran yang perlu divalidasi.</p>}
      </div>
    </div>
  );
}