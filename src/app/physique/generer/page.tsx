'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // clé publique uniquement
const supabase = createClient(supabaseUrl, supabaseKey);

const generateRandomId = (length = 12) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export default function CreateTicketPage() {
  const [created, setCreated] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const ticketCount = 500;
  const type = 'VVIP';

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg('');
    setCreated([]);

    const tickets = Array.from({ length: ticketCount }, () => ({
      id_ticket: generateRandomId(),
      type: type,
      statut: true,
    }));

    const { error } = await supabase.from('ticket_physique').insert(tickets);

    if (error) {
      setErrorMsg(error.message);
    } else {
      const ids = tickets.map((t) => t.id_ticket);
      setCreated(ids);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎫 Générateur de tickets {type}</h1>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Génération en cours...' : `Générer ${ticketCount} tickets ${type}`}
      </button>

      {errorMsg && <p className="text-red-600 mt-4">❌ {errorMsg}</p>}

      {created.length > 0 && (
        <div className="mt-6">
          <p className="font-semibold text-green-600 mb-2">
            ✅ {created.length} tickets créés avec succès :
          </p>
          <ul className="bg-gray-100 p-4 rounded max-h-[300px] overflow-auto">
            {created.map((id) => (
              <li key={id} className="text-sm text-gray-800">
                {id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}