'use client';

import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string>(''); // Simpan role yang login

  useEffect(() => {
    // 1. Cek siapa yang login dari LocalStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Mapping role dari email/data login
      if (userData.email.includes('admin')) setRole('admin');
      else if (userData.email.includes('sales')) setRole('penjualan');
      else if (userData.email.includes('desain')) setRole('perencana');
      else if (userData.email.includes('produksi')) setRole('pelaksana');
      else setRole('klien'); // Harusnya gak bisa masuk sini
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar Sistem?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Logout',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        router.push('/login');
      }
    });
  };

  const isActive = (path: string) => {
    return pathname === path ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300 hover:text-white';
  };

  // --- LOGIKA MENU SAKTI ---
  // Admin = Lihat SEMUA.
  // Staf lain = Cuma lihat menu kerjanya aja.
  const canAccess = (allowedRoles: string[]) => {
    if (role === 'admin') return true; // Admin mah bebas
    return allowedRoles.includes(role);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      <aside className="w-64 bg-slate-900 text-white fixed h-full hidden lg:block p-6 z-20 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl">A</div>
          <div>
            <h1 className="font-bold text-lg tracking-wide">Adea System</h1>
            <p className="text-xs text-slate-400 capitalize">{role || 'Loading...'}</p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          
          {/* GROUP 1: MENU UTAMA (Admin & Penjualan) */}
          {canAccess(['penjualan']) && (
            <>
              <p className="px-4 text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Menu Utama</p>
              <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/dashboard')}`}>
                <span>📊</span> Dashboard
              </Link>
              <Link href="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/orders')}`}>
                <span>📦</span> Pesanan Masuk
              </Link>
              {/* Validasi Pembayaran cuma buat Admin */}
              {canAccess([]) && ( 
                <Link href="/admin/payments" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/payments')}`}>
                  <span>💸</span> Validasi Bayar
                </Link>
              )}
            </>
          )}

          {/* GROUP 2: DIVISI OPERASIONAL */}
          <p className="px-4 text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Divisi Operasional</p>
          
          {/* Area Desainer: Admin & Perencana */}
          {canAccess(['perencana']) && (
            <Link href="/admin/design" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/design')}`}>
              <span>🎨</span> Area Desainer
            </Link>
          )}
          
          {/* Area Produksi: Admin & Pelaksana */}
          {canAccess(['pelaksana']) && (
            <Link href="/admin/production" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/production')}`}>
              <span>🔨</span> Area Produksi
            </Link>
          )}
          
          {/* Gudang: Admin & Penjualan */}
          {canAccess(['penjualan']) && (
            <Link href="/admin/inventory" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/inventory')}`}>
              <span>🏭</span> Gudang Bahan
            </Link>
          )}

          {/* GROUP 3: MASTER DATA (KHUSUS ADMIN) */}
          {canAccess([]) && ( // Array kosong artinya CUMA ADMIN yg bisa (krn admin return true di atas)
            <>
              <p className="px-4 text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Master Data</p>
              <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/products')}`}>
                <span>🛋️</span> Kelola Produk
              </Link>
              <Link href="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/users')}`}>
                <span>👥</span> Kelola User
              </Link>
              <Link href="/admin/reports" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/reports')}`}>
                <span>📑</span> Laporan
              </Link>
            </>
          )}

        </nav>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition font-bold">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 p-8">
        {children} 
      </main>
    </div>
  );
}