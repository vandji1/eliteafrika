// supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.ELITEAFRA_NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.ELITEAFRA_SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,           // ✅ garde la session dans localStorage
      autoRefreshToken: true,         // ✅ renouvelle automatiquement le token expiré
      detectSessionInUrl: true        // ✅ utile après magic link / reset password
    },
  });
