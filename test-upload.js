const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kwsimrthfcxgpkchuntt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3c2ltcnRoZmN4Z3BrY2h1bnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxODIwMDksImV4cCI6MjA4MDc1ODAwOX0.iQkZwFAcaqnco7-6JAkLT_Sbbqyaq_RCExVe3s3ZKHA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpload() {
    console.log("Testing Resume Upload...");

    // Create a dummy file buffer
    const fileContent = Buffer.from("Hello, this is a test resume.", 'utf-8');
    const fileName = `test_resume_${Date.now()}.txt`;

    // Try to upload
    const { data, error } = await supabase.storage
        .from('resumes')
        .upload(fileName, fileContent);

    if (error) {
        console.error("❌ Upload Failed!");
        console.error("Error Message:", error.message);
        console.error("Full Error:", JSON.stringify(error, null, 2));

        if (error.statusCode === '404') {
            console.log("\n💡 TIP: The bucket 'resumes' might not exist.");
        } else if (error.error === 'new row violates row-level security policy') {
            console.log("\n💡 TIP: You need to add an RLS Policy to allow 'anon' users to INSERT/UPLOAD files.");
        }
    } else {
        console.log("✅ Upload Successful!");
        console.log("File path:", data.path);

        // Clean up test file
        // await supabase.storage.from('resumes').remove([fileName]);
    }
}

testUpload();
