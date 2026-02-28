const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kwsimrthfcxgpkchuntt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3c2ltcnRoZmN4Z3BrY2h1bnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODIwMDksImV4cCI6MjA4MDc1ODAwOX0.iQkZwFAcaqnco7-6JAkLT_Sbbqyaq_RCExVe3s3ZKHA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectCandidates() {
    console.log("Inspecting Candidates Table...");

    // Try to fetch one row
    const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .limit(1);

    if (error) {
        console.error("❌ Error:", error.message);
        return;
    }

    if (data && data.length > 0) {
        console.log("✅ Found Data. Columns:", Object.keys(data[0]));
        console.log("First Row:", data[0]);
    } else {
        console.log("⚠️ Table is empty, cannot infer columns from data.");
        console.log("Trying to insert a dummy row to Force an Error (which might list columns)...");

        const { error: insertError } = await supabase
            .from('candidates')
            .insert([{ email: "test@example.com" }]); // Minimal insert

        if (insertError) {
            console.log("Insert Result:", insertError.message);
            // Sometimes error messages reveal expected columns
        }
    }
}

inspectCandidates();
