'use client';

import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar Mode Admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Logout',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) router.push('/login');
    });
  };

  const isActive = (path: string) => {
    return pathname === path ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300 hover:text-white';
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      <aside className="w-64 bg-slate-900 text-white fixed h-full hidden lg:block p-6 z-20 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl">A</div>
          <div>
            <h1 className="font-bold text-lg tracking-wide">Adea Admin</h1>
            <p className="text-xs text-slate-400">Management System</p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Menu Utama</p>
          <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/dashboard')}`}>
            <span>📊</span> Dashboard
          </Link>
          <Link href="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/orders')}`}>
            <span>📦</span> Pesanan Masuk
          </Link>
          {/* MENU BARU: VALIDASI PEMBAYARAN */}
          <Link href="/admin/payments" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/payments')}`}>
            <span>💸</span> Validasi Bayar
          </Link>

          <p className="px-4 text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Divisi Operasional</p>
          <Link href="/admin/design" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/design')}`}>
            <span>🎨</span> Area Desainer
          </Link>
          <Link href="/admin/production" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/production')}`}>
            <span>🔨</span> Area Produksi
          </Link>
          <Link href="/admin/inventory" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/inventory')}`}>
            <span>🏭</span> Gudang Bahan
          </Link>

          <p className="px-4 text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Master Data</p>
          <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/products')}`}>
            <span>🛋️</span> Kelola Produk
          </Link>
          {/* MENU BARU: USER & LAPORAN */}
          <Link href="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/users')}`}>
            <span>👥</span> Kelola User
          </Link>
          <Link href="/admin/reports" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive('/admin/reports')}`}>
            <span>📑</span> Laporan
          </Link>
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