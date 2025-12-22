'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi loading daftar...
    setTimeout(() => {
      setLoading(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Akun Dibuat!',
        text: 'Silakan login dengan akun barumu.',
        confirmButtonColor: '#312e81',
      }).then(() => {
        router.push('/login'); // Lempar ke halaman login
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 relative overflow-hidden">
        
        <div className="text-center mb-8">
           <h2 className="text-2xl font-extrabold text-slate-900">Buat Akun Baru</h2>
           <p className="text-slate-500 text-sm">Bergabunglah dengan Adea Furniture</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Lengkap</label>
            <input type="text" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Aneryu Adillah" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
            <input type="email" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="nama@email.com" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
            <input type="password" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-1 transition-all mt-4"
          >
             {loading ? 'Mendaftarkan...' : 'Daftar Akun'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-bold text-indigo-700 hover:underline">
            Login di sini
          </Link>
        </div>

      </div>
    </div>
  );
}