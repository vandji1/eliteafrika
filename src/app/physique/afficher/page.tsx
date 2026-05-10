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
  const [format, setFormat] = useState<"carte" | "bracelet">("bracelet");

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
    <div className="p-6 print:p-0">
      {/* Sélecteur format + bouton print */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <div>
          <label className="font-semibold mr-3">Format :</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "carte" | "bracelet")}
            className="border rounded-lg px-3 py-1"
          >
            <option value="carte">Carte (91×60 mm)</option>
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
        className={`print-area grid gap-6 ${format === "carte" ? "grid-cols-1" : "grid-cols-1"
          }`}
        style={{
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
        }}
      >
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`relative  bg-cover  text-white  overflow-hidden border ${format === "carte"
              ? "w-[86mm] h-[54mm]"
              : "w-[210mm] h-[20mm]"
              }`}
            style={{
              backgroundImage: "url('/dopelym/VIP.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              breakInside: "avoid",
            }}
          >
            <div className="absolute inset-0 bg-black/0" />

            {format === "carte" ? (
              <div className="relative flex flex-col items-end right-7 top-[10px] justify-end gap-0 h-full w-full p-3">
                <img
                  src={ticket.qr}
                  alt={`QR ${ticket.id}`}
                  className="w-20 h-20 bg-white p-0 rounded"
                />
                <div className="flex flex-col items-end gap-0">
                  <h2 className="text-sm font-bold text-right hidden">
                    {ticket.type}
                  </h2>
                  <h2 className="text-lg font-black hidden">20.000 Fcfa</h2>
                  <span className="text-[10px] text-slate-100">
                    ID: {ticket.id}
                  </span>
                  <h2 className="text-[8px] text-slate-100 text-right">
                    NB : chaque ticket est associé à un ID unique - fandrop.io
                  </h2>
                </div>
              </div>
            ) : (
              <div className="absolute flex-row  w-[120px] left-89 inset-0 flex items-center justify-around px-4 ">
                <h2 className="text-sm font-bold text-right hidden">
                  {ticket.type}
                </h2>
                <img
                  src={ticket.qr}
                  alt={`QR ${ticket.id}`}
                  className="w-22 h-22 bg-white p-0 rounded"
                />
                <div className="flex flex-col ml-2 items-start gap-0">
                  <span className="text-[8px] text-slate-100 font-black">
                    ID: {ticket.id}
                  </span>
                  <h2 className="text-[5px] text-slate-100 text-left">
                    NB : chaque ticket est associé <br />à un ID unique {ticket.type} - elitefrika.com
                  </h2>
                </div>
              </div>

            )}
          </div>
        ))}
      </div>

      {/* Styles impression */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
 
          

          
          .print-area > div {
            page-break-inside: avoid;
          }

          button,
          select,
          label {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

{/* 
  .print-area {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: auto;
    gap: 240mm;
    justify-items: center;
    align-items: center;
  } 
**/}