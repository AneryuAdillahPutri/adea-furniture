'use client';

import Swal from 'sweetalert2';

// Data User (Campuran Staf & Klien)
const users = [
  { id: 1, name: "Aneryu Adillah", email: "client@gmail.com", role: "Klien", phone: "08123456789" },
  { id: 2, name: "Budi Sales", email: "sales@adea.com", role: "Staf Penjualan", phone: "08987654321" },
  { id: 3, name: "Siti Desain", email: "desain@adea.com", role: "Perencana", phone: "08112233445" },
];

export default function UserManagement() {

  const handleAddUser = () => {
    Swal.fire({
      title: 'Tambah Staf Baru',
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Nama Lengkap">
        <input id="swal-email" class="swal2-input" placeholder="Email Login">
        <select id="swal-role" class="swal2-input">
          <option value="Staf Penjualan">Staf Penjualan</option>
          <option value="Perencana">Perencana (Desainer)</option>
          <option value="Pelaksana">Pelaksana (Produksi)</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      preConfirm: () => {
        return [
          (document.getElementById('swal-name') as HTMLInputElement).value,
          (document.getElementById('swal-role') as HTMLSelectElement).value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Berhasil', `Akun ${result.value?.[0]} sebagai ${result.value?.[1]} telah dibuat.`, 'success');
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">👥 Manajemen Pengguna</h2>
        <button onClick={handleAddUser} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">+ Tambah Staf</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">No. HP</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-6 py-4 font-bold text-slate-700">{u.name}</td>
                <td className="px-6 py-4 text-slate-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'Klien' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{u.phone}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-red-500 hover:text-red-700 font-bold text-xs">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}