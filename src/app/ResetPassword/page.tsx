import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

export default function ResetPassword() {
  const router = useRouter();

  const rawAccessToken = router.query.access_token;
  const accessToken =
    typeof rawAccessToken === 'string' ? rawAccessToken : rawAccessToken?.[0] || '';

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!accessToken) {
      setErrorMsg('Le token de réinitialisation est manquant dans l’URL.');
    }
  }, [accessToken]);

  const handleReset = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!password) {
      setErrorMsg('Veuillez entrer un nouveau mot de passe.');
      return;
    }
    if (!accessToken) {
      setErrorMsg('Token manquant, impossible de réinitialiser le mot de passe.');
      return;
    }

    setLoading(true);

    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: '',
    });

    if (sessionError) {
      setLoading(false);
      setErrorMsg(sessionError.message);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Votre mot de passe a été changé avec succès.');
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#4B0082', textAlign: 'center' }}>Réinitialiser le mot de passe</h1>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: 12,
            marginBottom: 20,
            borderRadius: 8,
            border: '1px solid #4B0082',
            fontSize: 16,
          }}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#4B0082',
            color: 'white',
            padding: 14,
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Chargement...' : 'Changer le mot de passe'}
        </button>
      </form>
    </div>
  );
}
