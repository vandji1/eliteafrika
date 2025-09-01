"use client";

import { useState } from "react";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu pourrais envoyer les données à ton backend ou API
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-xl font-semibold text-center text-amber-950">
              Suppression de compte
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Remplissez le formulaire ci-dessous pour demander la suppression de votre compte.
            </p>

            <div>
              <label className="block text-sm font-medium text-amber-950">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300 text-amber-950"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-950">Raison</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300 text-amber-950"
                rows={3}
                placeholder="Pourquoi souhaitez-vous supprimer votre compte ?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Supprimer mon compte
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-green-600">
              ✅ Votre demande a été envoyée !
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Merci de votre patience. La suppression sera effectuée dans un délai maximum de 24h.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
