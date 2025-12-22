'use client';

import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // Tambah ini buat redirect

// 1. Data Palsu
const products = [
  {
    id: 1,
    name: "Interior Coffee Shop",
    price: 3500000,
    category: "Interior", // Custom
    image: "/WhatsApp Image 2025-12-12 at 6.17.08 PM.jpeg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Meja Receptionist",
    price: 1250000,
    category: "Office", // Barang Jadi
    image: "/WhatsApp Image 2025-12-12 at 6.17.09 PM (2).jpeg",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Interior Dapur",
    price: 450000,
    category: "Interior", // Custom
    image: "/WhatsApp Image 2025-12-12 at 6.17.11 PM (3).jpeg",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Kamar Tidur",
    price: 890000,
    category: "Kamar", // Barang Jadi
    image: "/WhatsApp Image 2025-12-12 at 6.17.12 PM (1).jpeg",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Meja Kamar",
    price: 2100000,
    category: "Kamar", // Barang Jadi
    image: "/WhatsApp Image 2025-12-12 at 6.17.12 PM.jpeg",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Tangga",
    price: 150000,
    category: "Interior", // Custom
    image: "/WhatsApp Image 2025-12-12 at 6.17.13 PM.jpeg",
    rating: 4.4,
  },
];

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default function ProductsPage() {
  const router = useRouter(); // Hook buat pindah halaman
  
  const handleAddToCart = (productName: string) => {
    Swal.fire({
      icon: 'success',
      title: 'Berhasil Masuk Keranjang!',
      text: `${productName} sudah disimpan.`,
      confirmButtonColor: '#312e81',
      timer: 2000,
    });
  };

  // FUNGSI BARU: Handle Konsultasi
  const handleConsultation = () => {
    // Arahkan ke halaman form custom request
    router.push('/client/custom');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Navbar Simple */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="font-bold text-slate-900 group-hover:text-indigo-700 transition">Adea<span className="text-indigo-600"> Store</span></span>
        </Link>
        
        <div className="flex gap-4">
          <Link href="/client/dashboard" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-700">
            Dashboard
          </Link>
          <Link href="/cart" className="relative cursor-pointer group">
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
              2
            </span>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Katalog Pilihan</h1>
          <p className="text-slate-500">Temukan furnitur terbaik untuk hunian impianmu.</p>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            // LOGIKA CEK KATEGORI
            const isCustom = product.category === 'Interior';

            return (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-64 bg-slate-100 overflow-hidden cursor-pointer">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                      ★ {product.rating}
                    </div>
                  </div>
                  
                  <p className="text-xl font-extrabold text-indigo-900 mb-6">
                    {formatRupiah(product.price)}
                    {isCustom && <span className="text-xs font-normal text-slate-400 block">Est. per meter</span>}
                  </p>

                  {/* TOMBOL BERUBAH SESUAI KATEGORI */}
                  {isCustom ? (
                    // JIKA INTERIOR (CUSTOM) -> TOMBOL KONSULTASI
                    <button 
                      onClick={handleConsultation}
                      className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-emerald-600/20"
                    >
                      <span>💬 Konsultasi</span>
                    </button>
                  ) : (
                    // JIKA BARANG JADI -> TOMBOL KERANJANG
                    <button 
                      onClick={() => handleAddToCart(product.name)}
                      className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>+ Keranjang</span>
                    </button>
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}