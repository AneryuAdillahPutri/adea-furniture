'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Ceritanya lagi loading cek password ke server...
    setTimeout(() => {
      // Kita simpan data pura-pura (Dummy)
      const dummyUser = {
        nama_lengkap: "Aneryu Adillah Putri", // Ganti nama kamu di sini biar seneng hihi
        email: "aneryu@adea.com",
        no_telepon: "08123456789",
        role: "client"
      };

      // Simpan ke Browser (Cookies & LocalStorage)
      Cookies.set('token', 'ini-token-rahasia-banget', { expires: 1 });
      localStorage.setItem('user', JSON.stringify(dummyUser));

      setLoading(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Selamat datang kembali.',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        router.push('/client/dashboard'); // Tendang ke Dashboard
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden relative">
        
        {/* Hiasan background atas */}
        <div className="absolute top-0 left-0 w-full h-32 bg-indigo-900 rounded-b-[50%] scale-x-150 -translate-y-16"></div>

        <div className="relative z-10 p-8 pt-12">
          <div className="text-center mb-8">
            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center text-indigo-900 font-bold text-2xl shadow-lg mx-auto mb-4">A</div>
            <h2 className="text-2xl font-extrabold text-slate-900">Selamat Datang</h2>
            <p className="text-slate-500 text-sm">Masuk untuk mengelola pesananmu</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="nama@email.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-indigo-900 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/20 hover:bg-indigo-800 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : (
                'Masuk Sekarang'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <Link href="/register" className="font-bold text-indigo-700 hover:underline">
              Daftar dulu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}