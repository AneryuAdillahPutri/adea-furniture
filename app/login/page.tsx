'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi Cek Login
    setTimeout(() => {
      let userData;
      let redirectUrl;

      // LOGIKA UTAMA: Cek apakah email ada kata 'admin'?
      if (email.toLowerCase().includes('admin')) {
        // MASUK SEBAGAI ADMIN
        userData = { name: "Administrator", email: email, role: "admin" };
        redirectUrl = '/admin/dashboard';
      } else {
        // MASUK SEBAGAI KLIEN
        userData = { name: "Aneryu Adillah", email: email, role: "client" };
        redirectUrl = '/client/dashboard';
      }

      // Simpan data
      Cookies.set('token', 'token-rahasia', { expires: 1 });
      localStorage.setItem('user', JSON.stringify(userData));

      setLoading(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: `Masuk sebagai ${userData.role === 'admin' ? 'Admin' : 'Klien'}...`,
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        router.push(redirectUrl);
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden relative">
        <div className="p-8 pt-12">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">Login Sistem</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200"
                placeholder="admin@adea.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-indigo-900 text-white font-bold rounded-xl shadow-lg"
            >
              {loading ? 'Memproses...' : 'Masuk Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}