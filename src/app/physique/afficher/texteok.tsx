"use client";
import React, { useEffect, useState } from "react";

interface Ticket {
  id: string;
  type: string;
  statut: string;
  qr: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [format, setFormat] = useState<"carte" | "bracelet">("carte");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("/api/physique_qrcode");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error("Erreur fetch tickets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      {/* Sélecteur format + bouton print */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <label className="font-semibold mr-3">Format :</label>
          <select
            value={format}
            onChange={(e) =>
              setFormat(e.target.value as "carte" | "bracelet")
            }
            className="border rounded-lg px-3 py-1"
          >
            <option value="carte">Carte (91×55 mm)</option>
            <option value="bracelet">Bracelet</option>
          </select>
        </div>

        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Imprimer / Export PDF
        </button>
      </div>

      {/* Zone imprimable */}
      <div
        className={`grid gap-4 ${
          format === "carte" ? "grid-cols-2" : "grid-cols-3"
        } print:grid-cols-2`}
        style={{
          width: "210mm", // largeur A4
          minHeight: "297mm", // hauteur A4
        }}
      >
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`relative bg-cover text-white shadow-lg rounded-xl overflow-hidden border ${
              format === "carte"
                ? "w-[91mm] h-[61mm]"
                : "w-[70mm] h-[25mm]"
            }`}
            style={{
              backgroundImage: "url('/affiche_concert.png')",
              backgroundPosition: format === "carte" ? "center" : "top",
            }}
          >
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Contenu */}
            {format === "carte" ? (
              <div className="relative flex flex-row items-end justify-end gap-10 h-full w-full p-3">
                <div>
                  <h2 className="text-sm font-bold">{ticket.type}</h2>
                  <h2 className="text-lg font-black">20.000 Fcfa</h2>
                  <span className="text-xs">ID: {ticket.id}</span>
                  <p className="text-[9px] text-blue-300">
                    eliteafrika.com
                  </p>
                </div>
                <img
                  src={ticket.qr}
                  alt={`QR ${ticket.id}`}
                  className="w-16 h-16 bg-white p-1 rounded"
                />
              </div>
            ) : (
              <div className="relative flex items-center justify-between h-full px-2">
                <p className="text-xs font-bold">{ticket.type}</p>
                <img
                  src={ticket.qr}
                  alt={`QR ${ticket.id}`}
                  className="w-12 h-12 bg-white p-1 rounded"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
