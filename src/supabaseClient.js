import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jxjcjmarroyvxnfafxiq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4amNqbWFycm95dnhuZmFmeGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDA5MzcsImV4cCI6MjA2NTg3NjkzN30.LyDcr-TQdE0cmXQIsdFsZbxfs-O3ShGcJspjGZ3te0E";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
