// src/app/reset-password/ResetPasswordClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

export default function ResetPasswordClient() {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    // Supprime le `#` du début
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');

    if (!token) {
      setMessage({ text: 'Token de réinitialisation manquant.', type: 'error' });
    } else {
      setAccessToken(token);
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!password.trim()) {
      setMessage({ text: 'Veuillez entrer un nouveau mot de passe.', type: 'error' });
      return;
    }

    if (!accessToken) {
      setMessage({ text: 'Token invalide ou manquant.', type: 'error' });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Mot de passe changé avec succès ! Redirection...', type: 'success' });
      setTimeout(() => {
        // Redirection vers ton app mobile via le schéma d'URL
        window.location.href = 'eliteafrika://';
      }, 2500);
    }
  };

  return (
    <main

      style={{
        maxWidth: 400,
        margin: '3rem auto',
        padding: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        border: '1px solid #ddd',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1 style={{ color: '#4B0082', textAlign: 'center', marginBottom: '1.5rem' }}>
        Réinitialiser le mot de passe
      </h1>

      {message && (
        <p
          style={{
            color: message.type === 'error' ? '#b00020' : '#006400',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
          role="alert"
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          autoFocus
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: 6,
            border: '1px solid #4B0082',
            marginBottom: '1.25rem',
            boxSizing: 'border-box',
            color: '#333',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#4B0082',
            color: '#fff',
            padding: '0.85rem',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: 6,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = '#37006b';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#4B0082';
          }}
        >
          {loading ? 'Patientez...' : 'Changer le mot de passe'}
        </button>
      </form>
    </main>
  );
}
