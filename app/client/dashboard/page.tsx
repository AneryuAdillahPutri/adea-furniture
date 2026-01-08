'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar dari Adea?',
      text: "Sampai jumpa lagi nanti!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3730a3', // Warna Indigo tua
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl px-6 py-3 font-bold',
        cancelButton: 'rounded-xl px-6 py-3 font-bold text-gray-700'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    });
  };

  if (!user) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-900 mb-4"></div>
      <p className="text-slate-500 font-medium">Memuat data Adea...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navbar Premium dengan efek kaca */}
      <nav className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2">
           {/* Logo sederhana */}
          <div className="h-8 w-8 bg-indigo-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Adea<span className="text-indigo-600"> Client</span></h1>
        </div>
        
        <div className="flex gap-6 items-center">
          <Link href="/products" className="text-sm font-semibold text-slate-500 hover:text-indigo-700 transition-colors py-2">
            Katalog
          </Link>
          <button 
            onClick={handleLogout} 
            className="px-5 py-2 text-sm font-bold text-indigo-700 border border-indigo-100 bg-indigo-50/50 rounded-full hover:bg-indigo-100 hover:border-indigo-200 transition-all active:scale-95"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header Sambutan Estetik */}
        <div className="mb-12">
          <p className="text-slate-500 font-medium mb-2 flex items-center gap-2">
            <span className="inline-block w-8 h-[1px] bg-slate-300"></span>
            Client Area
          </p>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Selamat datang, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600">
              {/* PERBAIKAN DI SINI: user.name */}
              {user.name}
            </span> 👋
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Kartu Profil - Tampilan Premium */}
          <div className="col-span-1 lg:col-span-8 bg-white p-8 rounded-[2rem] shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-slate-100/80 relative overflow-hidden group">
            {/* Dekorasi background halus */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -translate-y-32 translate-x-32 group-hover:bg-indigo-100/50 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-xl">👤</span> Informasi Akun
                </h3>
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold uppercase tracking-wider ring-2 ring-white">
                  ● Aktif
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Nama Lengkap</label>
                  {/* PERBAIKAN DI SINI: user.name */}
                  <p className="text-lg font-semibold text-slate-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Terdaftar</label>
                  <p className="text-lg font-semibold text-slate-900 truncate" title={user.email}>{user.email}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Nomor Telepon</label>
                  <p className="text-lg font-semibold text-slate-900 font-mono">{user.no_telepon || '-'}</p>
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Tipe Member</label>
                   <p className="text-lg font-semibold text-indigo-900">Retail Client</p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Cepat - Tombol Modern */}
          <div className="col-span-1 lg:col-span-4 space-y-5">
            
          {/* Tombol Request Custom (BARU) */}
            <Link href="/client/custom" className="group flex items-center justify-between p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-[2rem] shadow-lg shadow-purple-600/20 hover:-translate-y-1 transition-all">
              <div>
                <h3 className="text-xl font-bold mb-1">Request Custom</h3>
                <p className="text-purple-100 text-sm">Punya desain sendiri?</p>
              </div>
              <span className="text-3xl">🎨</span>
            </Link>
            
            {/* Tombol Pesanan - Aksen Dominan */}
            <Link href="/client/orders" className="group relative flex items-center justify-between p-6 bg-indigo-900 text-white rounded-[2rem] shadow-lg shadow-indigo-900/20 hover:shadow-xl hover:shadow-indigo-900/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1 group-hover:tracking-wide transition-all">Riwayat Pesanan</h3>
                <p className="text-indigo-200 text-sm font-medium">Lacak progres order Anda</p>
              </div>
              <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">
                📦
              </div>
               {/* Efek kilau saat hover */}
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            </Link>

            {/* Tombol Katalog - Aksen Sekunder Clean */}
            <Link href="/products" className="group flex items-center justify-between p-6 bg-white border-2 border-slate-100 text-slate-800 rounded-[2rem] hover:border-indigo-200 hover:bg-indigo-50/30 hover:-translate-y-1 transition-all duration-300">
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-indigo-900 transition-colors">Katalog Produk</h3>
                <p className="text-slate-500 text-sm font-medium">Lihat koleksi terbaru Adea</p>
              </div>
              <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-indigo-100/50 group-hover:text-indigo-900 transition-colors">
                🛋️
              </div>
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
}