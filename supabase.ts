import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,           // ✅ garde la session dans localStorage
    autoRefreshToken: true,         // ✅ renouvelle automatiquement le token expiré
    detectSessionInUrl: true        // ✅ utile après magic link / reset password
  },
});
