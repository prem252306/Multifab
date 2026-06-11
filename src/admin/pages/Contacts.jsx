import { useEffect, useState } from "react";
import api from "../services/api";
import { FaTrash, FaEnvelope, FaPhone, FaComments } from "react-icons/fa";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contact");
      setContacts(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact message?")) return;

    try {
      await api.delete(`/contact/${id}`);
      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-black font-outfit text-white gold:gradient-gold tracking-tight flex items-center gap-3">
          <FaEnvelope className="text-orange-500 gold:text-[#d4af37] text-3xl" />
          <span>Contact Inbox</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1 uppercase font-semibold tracking-wider">
          Review customer inquiries and project briefs
        </p>
      </div>

      {/* Grid Container */}
      <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 md:p-8 rounded-[32px] shadow-2xl">
        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-950/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 text-slate-300 font-bold uppercase text-xs border-b border-white/5">
                <th className="p-4 w-16">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message</th>
                <th className="p-4 text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-200">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-500 font-bold">
                    No contact messages found in the database.
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-bold text-slate-500">{item.id}</td>
                    <td className="p-4 font-black font-outfit text-white">{item.name}</td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors">
                        <FaEnvelope className="text-orange-500 gold:text-[#d4af37]" />
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                          <FaPhone className="text-slate-500" />
                          <a href={`tel:${item.phone}`}>{item.phone}</a>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase">
                        {item.subject || "General Query"}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs xl:max-w-md">
                      <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                        {item.message}
                      </p>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteContact(item.id)}
                        className="p-3 bg-red-500/15 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300 border border-red-500/20 hover:border-transparent active:scale-95 shadow-md"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}