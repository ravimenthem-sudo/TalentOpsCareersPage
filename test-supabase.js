const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kwsimrthfcxgpkchuntt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3c2ltcnRoZmN4Z3BrY2h1bnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODIwMDksImV4cCI6MjA4MDc1ODAwOX0.iQkZwFAcaqnco7-6JAkLT_Sbbqyaq_RCExVe3s3ZKHA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log("Testing Supabase Connection...");

    // 1. Try to fetch ALL jobs (no filter)
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .limit(5);

    if (error) {
        console.error("❌ Error fetching jobs:", error);
        return;
    }

    console.log("✅ Connection Successful!");
    console.log(`Found ${data.length} jobs.`);

    if (data.length > 0) {
        console.log("First Job Data Structure:", data[0]);
    } else {
        console.log("⚠️ No jobs found in table 'jobs'.");
    }
}

testConnection();
