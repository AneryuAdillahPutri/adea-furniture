'use client';

export default function AdminDashboard() {
  
  const stats = [
    { title: "Total Pendapatan", value: "Rp 45.200.000", icon: "💰", color: "bg-emerald-100 text-emerald-700" },
    { title: "Pesanan Baru", value: "12", icon: "📦", color: "bg-blue-100 text-blue-700" },
    { title: "Total Produk", value: "6", icon: "🛋️", color: "bg-indigo-100 text-indigo-700" },
    { title: "Pelanggan", value: "128", icon: "👥", color: "bg-orange-100 text-orange-700" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Budi Santoso", item: "Interior Coffee Shop", date: "12 Des 2025", status: "Pending", total: "Rp 3.500.000" },
    { id: "ORD-002", customer: "Siti Aminah", item: "Meja Receptionist", date: "11 Des 2025", status: "Dibayar", total: "Rp 1.250.000" },
  ];

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-slate-500">Ringkasan aktivitas toko hari ini.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">Administrator</p>
            <p className="text-xs text-slate-500">Super User</p>
          </div>
          <div className="h-10 w-10 bg-indigo-100 rounded-full border-2 border-indigo-500 flex items-center justify-center font-bold text-indigo-700">A</div>
        </div>
      </header>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color} text-2xl`}>{stat.icon}</div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabel Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Pesanan Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Pelanggan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-bold text-slate-600">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">{order.status}</span>
                  </td>
                  <td className="px-4 py-3 font-bold">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}