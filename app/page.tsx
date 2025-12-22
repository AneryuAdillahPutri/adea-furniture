import Link from "next/link";
import Image from "next/image"; // <-- 1. JANGAN LUPA IMPORT INI

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-900 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/20">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Adea<span className="text-indigo-600"> Furniture</span></span>
          </div>

          <div className="flex gap-4">
            <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-900 rounded-full hover:bg-indigo-800 shadow-lg shadow-indigo-900/20 transition-all active:scale-95">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Kiri: Teks */}
          <div className="space-y-8 animate-fade-in-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Koleksi Terbaru 2025
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Hidupkan Ruang, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600">
                Ciptakan Cerita.
              </span>
            </h1>
            
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
              Temukan furnitur berkualitas premium dengan desain modern yang dirancang untuk kenyamanan dan estetika rumah impian Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="px-8 py-4 bg-indigo-900 text-white font-bold rounded-2xl shadow-xl shadow-indigo-900/20 hover:-translate-y-1 transition-all text-center">
                Lihat Katalog 🛋️
              </Link>
              <Link href="/register" className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-2xl hover:border-indigo-200 hover:text-indigo-900 hover:-translate-y-1 transition-all text-center">
                Gabung Member
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-8 text-slate-400">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">1.2k+</span>
                <span className="text-xs font-medium uppercase tracking-wider">Pelanggan Puas</span>
              </div>
              <div className="w-[1px] h-10 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900">150+</span>
                <span className="text-xs font-medium uppercase tracking-wider">Katalog Produk</span>
              </div>
            </div>
          </div>

          {/* Kanan: Gambar Utama */}
          <div className="relative h-[500px] lg:h-[650px] bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl order-1 lg:order-2 group">
             
             {/* 2. INI DIA KODINGAN GAMBARNYA */}
             <Image
               src="/2b76cc89c6c9553288e83f48495a5357.jpg"
               alt="Interior ruang tamu minimalis dengan sofa modern"
               fill // Biar gambarnya menuhin kotak
               className="object-cover z-0 group-hover:scale-105 transition-transform duration-700" // Efek zoom pas di-hover
               priority // Biar loadingnya cepet
             />

             {/* Overlay biar teks "Desain Minimalis" lebih kebaca */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent z-10"></div>
             
             {/* Kotak Floating "Desain Minimalis" */}
             <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md border border-white/50 rounded-3xl shadow-lg z-20">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl">✨</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Desain Minimalis Modern</h3>
                    <p className="text-slate-600">Harmoni sempurna antara fungsi dan estetika.</p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center">
        <p className="text-slate-400 text-sm">© 2025 Adea Furniture. All rights reserved.</p>
      </footer>

    </div>
  );
}