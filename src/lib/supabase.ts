import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kwsimrthfcxgpkchuntt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3c2ltcnRoZmN4Z3BrY2h1bnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODIwMDksImV4cCI6MjA4MDc1ODAwOX0.iQkZwFAcaqnco7-6JAkLT_Sbbqyaq_RCExVe3s3ZKHA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
