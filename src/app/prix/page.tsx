'use client';

import { useState } from 'react';

export default function CalculPrixPage() {
  const [prixReduit, setPrixReduit] = useState<number | ''>('');
  const [pourcentage, setPourcentage] = useState<number | ''>('');
  const [prixNormal, setPrixNormal] = useState<number | null>(null);

  const calculerPrixNormal = () => {
    if (prixReduit && pourcentage) {
      // formule : prixNormal = prixReduit / (1 - (pourcentage / 100))
      const normal = prixReduit / (1 - pourcentage / 100);
      setPrixNormal(Number(normal.toFixed(2)));
    } else {
      setPrixNormal(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-black">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          🧮 Calculateur de Prix Normal
        </h1>

        <div className="flex flex-col gap-4 text-black">
          <div>
            <label className="block mb-1 font-medium text-black">Prix réduit (FCFA)</label>
            <input
              type="number"
              value={prixReduit}
              onChange={(e) => setPrixReduit(Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
              placeholder="Ex: 25000"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Pourcentage de réduction (%)</label>
            <input
              type="number"
              value={pourcentage}
              onChange={(e) => setPourcentage(Number(e.target.value))}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
              placeholder="Ex: 20"
            />
          </div>

          <button
            onClick={calculerPrixNormal}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Calculer
          </button>

          {prixNormal !== null && (
            <div className="mt-4 text-center bg-green-50 border border-green-200 p-3 rounded-lg text-black">
              <p className="text-black">💰 Prix normal estimé :</p>
              <p className="text-2xl font-bold text-black">
                {prixNormal.toLocaleString()} FCFA
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
