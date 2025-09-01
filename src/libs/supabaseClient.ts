import { createClient } from "@supabase/supabase-js";

// Récupère les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_auto!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_auto!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
