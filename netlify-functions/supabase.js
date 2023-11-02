import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jnryovwodhapsbzdnhnu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucnlvdndvZGhhcHNiemRuaG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4NDg4NTIsImV4cCI6MjAxMzQyNDg1Mn0.lMlWnL7XEdAxgYf4Shky-4SkyOsQJYHPu7i1ALFjw6Q";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
