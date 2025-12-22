'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const initialCart = [
  {
    id: 1,
    name: "Interior Coffee Shop",
    price: 3500000,
    image: "/WhatsApp Image 2025-12-12 at 6.17.08 PM.jpeg", 
    quantity: 1,
    category: "Interior"
  },
  {
    id: 2,
    name: "Meja Receptionist",
    price: 1250000,
    image: "/WhatsApp Image 2025-12-12 at 6.17.09 PM (2).jpeg",
    quantity: 2,
    category: "Office"
  }
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCart);

  // Hitung Total
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.11; // PPN 11%
  const total = subtotal + tax;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleCheckout = () => {
    Swal.fire({
      title: 'Konfirmasi Pembayaran',
      text: `Total tagihan: ${formatRupiah(total)}. Bayar sekarang?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#312e81',
      confirmButtonText: 'Ya, Bayar!',
      cancelButtonText: 'Nanti dulu'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Berhasil!', 'Pesanan sedang diproses.', 'success').then(() => {
          router.push('/client/orders'); // Lempar ke riwayat pesanan
        });
      }
    });
  };

  const handleDelete = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar Simple */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <Link href="/products" className="text-slate-500 hover:text-indigo-900 font-medium">← Lanjut Belanja</Link>
        <div className="flex-1 text-center font-bold text-xl text-slate-900">Keranjang Saya</div>
        <div className="w-20"></div> {/* Spacer biar tengah */}
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* List Barang (Kiri) */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 items-center shadow-sm">
                  {/* Gambar Kecil */}
                  <div className="h-24 w-24 bg-slate-100 rounded-xl overflow-hidden relative flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500 mb-2">{item.category}</p>
                    <p className="font-bold text-indigo-700">{formatRupiah(item.price)}</p>
                  </div>

                  {/* Aksi */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-bold text-slate-400">x{item.quantity}</span>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan Belanja (Kanan - Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg sticky top-6">
                <h3 className="font-bold text-lg mb-4 text-slate-900">Ringkasan Belanja</h3>
                
                <div className="space-y-3 border-b border-slate-100 pb-4 mb-4 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Harga ({cartItems.length} barang)</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>PPN (11%)</span>
                    <span>{formatRupiah(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-slate-900">Total Tagihan</span>
                  <span className="font-extrabold text-xl text-indigo-900">{formatRupiah(total)}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-indigo-900 text-white font-bold rounded-xl hover:bg-indigo-800 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-900/20"
                >
                  Checkout Sekarang
                </button>
              </div>
            </div>

          </div>
        ) : (
          // Kalau Keranjang Kosong
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-slate-900">Keranjangmu Kosong</h2>
            <p className="text-slate-500 mb-8">Wah, belum ada furnitur idaman nih.</p>
            <Link href="/products" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition">
              Mulai Belanja
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}