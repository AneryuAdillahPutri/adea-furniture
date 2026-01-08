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
      const emailLower = email.toLowerCase();

      // --- LOGIKA PEMBAGIAN ROLE (SESUAI SKPL) ---
      
      if (emailLower.includes('admin')) {
        // 1. ADMIN UTAMA
        userData = { name: "Administrator", email: email, role: "admin" };
        redirectUrl = '/admin/dashboard';
      
      } else if (emailLower.includes('sales') || emailLower.includes('penjualan')) {
        // 2. STAF PENJUALAN -> Masuk ke Gudang
        userData = { name: "Staf Penjualan", email: email, role: "admin" }; // Tetap role admin biar bisa akses sidebar
        redirectUrl = '/admin/inventory'; 
      
      } else if (emailLower.includes('desain') || emailLower.includes('design')) {
        // 3. STAF DESAINER -> Masuk ke Area Desain
        userData = { name: "Staf Perencana", email: email, role: "admin" };
        redirectUrl = '/admin/design';
      
      } else if (emailLower.includes('produksi') || emailLower.includes('production')) {
        // 4. STAF PRODUKSI -> Masuk ke Area Produksi
        userData = { name: "Staf Pelaksana", email: email, role: "admin" };
        redirectUrl = '/admin/production';
      
      } else {
        // 5. KLIEN / PELANGGAN (LOGIKA PINTAR 🧠)
        
        let clientName = "Pelanggan Setia"; // Nama Default

        // Cek nama khusus dari email
        if (emailLower.includes('novia')) {
          clientName = "Novia Ardany";
        } else if (emailLower.includes('aneryu')) {
          clientName = "Aneryu Adillah";
        } else {
          // Logika Otomatis: Ambil nama depan dari email (contoh: budi@gmail.com -> Budi)
          const namePart = email.split('@')[0];
          // Huruf pertama jadi kapital
          clientName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        }

        userData = { name: clientName, email: email, role: "client" };
        redirectUrl = '/client/dashboard';
      }

      // Simpan data
      Cookies.set('token', 'token-rahasia', { expires: 1 });
      localStorage.setItem('user', JSON.stringify(userData));

      setLoading(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: `Selamat datang, ${userData.name}!`,
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">Adea System</h1>
            <p className="text-slate-500 text-sm mt-2">Masuk sesuai peran Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Akun</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Contoh: sales@adea.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-indigo-900 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-800 transition-all disabled:opacity-70"
            >
              {loading ? 'Memproses...' : 'Masuk Sistem'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
             <p className="text-xs text-center text-slate-400">
               Gunakan email: <b>admin</b>, <b>sales</b>, <b>desain</b>, <b>produksi</b>, atau email pribadi untuk <b>klien</b>.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}