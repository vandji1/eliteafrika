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
            {/* Sélecteur format */}
            <div className="mb-6">
                <label className="font-semibold mr-3">Format :</label>
                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as "carte" | "bracelet")}
                    className="border rounded-lg px-3 py-1"
                >
                    <option value="carte">Carte (85×55 mm)</option>
                    <option value="bracelet">Bracelet</option>
                </select>
            </div>

            {/* Tickets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className={`relative bg-cover bg-center text-white shadow-lg rounded-xl overflow-hidden border ${format === "carte"
                            ? "w-[322px] h-[208px]" // 85x55mm
                            : "w-[300px] h-[60px]"
                            }`}
                        style={{
                            backgroundImage: "url('/affiche_concert.png')",
                            backgroundPosition: format === "carte" ? "center" : "top", // 🟢 top sur bracelet
                        }}
                    >
                        {/* Overlay sombre pour contraste */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Contenu */}
                        {format === "carte" ? (
                            <div className="relative flex flex-row items-end justify-end h-full w-full text-center p-3">
                                <div className="absolute bottom-3 left-28 text-right">
                                    <h2 className="text-2xl font-bold">{ticket.type}</h2> 
                                    <span className="text-xs mt-1">ID: {ticket.id}</span>
                                    <h2 className="text-xs mt-1 text-blue-400">eliteafrika.com</h2>
                                    <h5 className="text-[5px] mt-1 text-slate-200">NB : Chaque ticket possède un code QR unique</h5> 
                                </div>
                                <img
                                    src={ticket.qr}
                                    alt={`QR ${ticket.id}`}
                                    className="w-20 h-20 mt-2 bg-white p-1 rounded"
                                />

                            </div>

                        ) : (
                            <div className="relative flex items-center justify-between h-full px-4">
                                <div>
                                    <p className="text-sm font-bold">{ticket.type}</p>
                                </div>
                                <img
                                    src={ticket.qr}
                                    alt={`QR ${ticket.id}`}
                                    className="w-10 h-10 bg-white p-1 rounded"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
