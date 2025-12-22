'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

const initialTasks = [
  { id: "ORD-003", item: "Interior Dapur Set", progress: 25, status: "Pemotongan Bahan" },
  { id: "ORD-004", item: "Lemari Wardrobe Custom", progress: 80, status: "Finishing / Cat" },
];

export default function ProductionDashboard() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleUpdate = (id: string) => {
    Swal.fire({
      title: 'Update Progres Produksi',
      input: 'select',
      inputOptions: {
        '25': '25% - Pemotongan Bahan',
        '50': '50% - Perakitan (Assembling)',
        '75': '75% - Finishing / Pengecatan',
        '100': '100% - Selesai & Quality Control'
      },
      inputPlaceholder: 'Pilih tahapan saat ini...',
      showCancelButton: true,
      confirmButtonText: 'Update Status',
      confirmButtonColor: '#059669', // Emerald
    }).then((result) => {
      if (result.isConfirmed) {
        // Update dummy state
        const newVal = parseInt(result.value);
        const label = result.value === '100' ? 'Selesai' : `Proses ${result.value}%`;
        
        setTasks(tasks.map(t => t.id === id ? {...t, progress: newVal, status: label} : t));
        
        Swal.fire('Updated!', 'Status produksi berhasil diperbarui.', 'success');
      }
    });
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">🔨 Area Produksi (Pelaksana)</h2>
        <p className="text-slate-500">Pantau dan update progres pengerjaan barang di workshop.</p>
      </header>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
            <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center text-3xl">🪚</div>
            
            <div className="flex-1 w-full">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-slate-800">{task.item} <span className="font-mono text-slate-400 text-xs ml-2">#{task.id}</span></h3>
                <span className="text-sm font-bold text-indigo-600">{task.status}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 mb-1">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 text-right">{task.progress}% Selesai</p>
            </div>

            <button 
              onClick={() => handleUpdate(task.id)}
              className="px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition"
            >
              Update Progres
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}