import React, { useState } from "react";
import { getStaffUsers, saveStaffUsers } from "@/services/userService";
import { StaffUser } from "@/types/user";

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<StaffUser[]>(getStaffUsers());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<any>("Manager");

  const handleAdd = () => {
    if (!name || !phone) return;
    const u: StaffUser = {
      id: "usr-" + Date.now(),
      name,
      phone,
      email: `${phone}@technoworldbangladesh.com`,
      role,
      permissions: role === "Manager" ? ["products.*", "orders.*"] : ["orders.view"],
      isActive: true,
      createdAt: new Date().toISOString()
    };
    const updated = [u, ...users];
    setUsers(updated);
    saveStaffUsers(updated);
    setName("");
    setPhone("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">👤 ইউজার ও স্টাফ রোল ম্যানেজমেন্ট</h1>
          <p className="text-xs text-slate-500">ভূমিকা অনুযায়ী নির্দিষ্ট কন্ট্রোল প্যানেল বরাদ্দ</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2 text-xs">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="স্টাফের নাম..." className="p-2 border rounded-xl" />
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="মোবাইল নম্বর..." className="p-2 border rounded-xl" />
        <select value={role} onChange={e => setRole(e.target.value)} className="p-2 border rounded-xl font-bold">
          <option value="Manager">Manager</option>
          <option value="Worker">Worker</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={handleAdd} className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl">
          + ইউজার যুক্ত করুন
        </button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b font-bold">
            <tr>
              <th className="p-3">নাম</th>
              <th className="p-3">মোবাইল</th>
              <th className="p-3">রোল</th>
              <th className="p-3">পারমিশন</th>
              <th className="p-3 text-center">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">{u.name}</td>
                <td className="p-3 font-mono">{u.phone}</td>
                <td className="p-3"><span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">{u.role}</span></td>
                <td className="p-3 text-slate-500">{u.permissions.join(", ")}</td>
                <td className="p-3 text-center"><span className="text-emerald-700 font-bold">সক্রিয়</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
