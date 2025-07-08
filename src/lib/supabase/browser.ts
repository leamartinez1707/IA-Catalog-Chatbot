import { createBrowserClient } from '@supabase/ssr';

export const browserSupabase = createBrowserClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);
