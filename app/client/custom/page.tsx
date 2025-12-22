'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function CustomOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi kirim data ke server
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: 'Permintaan Terkirim! 🎨',
        text: 'Tim Desainer kami akan segera meninjau referensi Anda.',
        icon: 'success',
        confirmButtonText: 'Lihat Status',
        confirmButtonColor: '#312e81'
      }).then(() => {
        router.push('/client/orders'); // Kembali ke riwayat
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Navbar Simple */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/client/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-indigo-900 font-bold transition">
          ← Kembali ke Dashboard
        </Link>
        <div className="font-bold text-lg text-slate-900">Form Pesanan Custom</div>
        <div className="w-10"></div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-indigo-900 p-8 text-white text-center relative overflow-hidden">
            {/* Dekorasi background */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-20"></div>
            <h1 className="text-3xl font-extrabold relative z-10">Wujudkan Ide Furniturmu</h1>
            <p className="text-indigo-200 mt-2 relative z-10">Punya desain impian? Ceritakan pada kami, kami buatkan nyata.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Kategori */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Jenis Furnitur</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700">
                <option>Interior Full (Kitchen Set, Kamar, dll)</option>
                <option>Loose Furniture (Meja, Kursi, Lemari)</option>
                <option>Instalasi (Tangga, Railing, Kanopi)</option>
                <option>Lainnya</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Kebutuhan</label>
              <textarea 
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Contoh: Saya ingin Kitchen Set minimalis bentuk L, warna dominan putih dan kayu. Ukuran ruangan sekitar 3x4 meter..."
              ></textarea>
              <p className="text-xs text-slate-400 mt-2 text-right">Semakin detail semakin baik.</p>
            </div>

            {/* Upload File */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Referensi Gambar / Sketsa</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer relative group">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,.pdf" required />
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📁</div>
                <p className="font-bold text-slate-600">Klik untuk upload gambar</p>
                <p className="text-xs text-slate-400 mt-1">Format JPG, PNG, atau PDF (Max 5MB)</p>
              </div>
            </div>

            {/* Budget (Opsional) */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Estimasi Budget (Opsional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                <input 
                  type="number" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="0"
                />
              </div>
            </div>

            <hr className="border-slate-100 my-6" />

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-1 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? 'Mengirim Data...' : 'Kirim Permintaan Desain 🚀'}
            </button>

          </form>
        </div>

      </main>
    </div>
  );
}