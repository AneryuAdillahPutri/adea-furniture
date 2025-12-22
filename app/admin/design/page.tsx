'use client';

import Swal from 'sweetalert2';

// Data Dummy: Pesanan yang butuh desain
const designTasks = [
  { id: "ORD-001", client: "Aneryu Adillah", request: "Interior Coffee Shop Industrial", status: "Menunggu Desain", deadline: "15 Des 2025" },
  { id: "ORD-005", client: "Budi Santoso", request: "Kitchen Set Minimalis", status: "Revisi Desain", deadline: "20 Des 2025" },
];

export default function DesignDashboard() {

  const handleUpload = (id: string) => {
    Swal.fire({
      title: 'Unggah Desain Teknis',
      input: 'file', // Input tipe file
      inputAttributes: {
        'accept': 'image/*,application/pdf',
        'aria-label': 'Upload desain teknis'
      },
      html: `<p class="text-sm text-gray-500 mb-4">Upload file gambar kerja/3D untuk pesanan <b>${id}</b> agar bisa lanjut ke produksi.</p>`,
      showCancelButton: true,
      confirmButtonText: 'Upload & Kirim',
      confirmButtonColor: '#312e81',
      showLoaderOnConfirm: true,
      preConfirm: (file) => {
        // Simulasi upload
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, 1500)
        })
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Berhasil!', 'Desain terkirim ke Tim Produksi.', 'success');
      }
    })
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">🎨 Area Desainer (Perencana)</h2>
        <p className="text-slate-500">Daftar antrian pesanan custom yang membutuhkan gambar teknis.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {designTasks.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:border-indigo-300 transition">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">{task.status}</span>
              <span className="text-xs font-mono text-slate-400">{task.deadline}</span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-800 mb-1">{task.request}</h3>
            <p className="text-sm text-slate-500 mb-6">Klien: {task.client}</p>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50">
                Lihat Referensi
              </button>
              <button 
                onClick={() => handleUpload(task.id)}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
              >
                Unggah Desain 📤
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}