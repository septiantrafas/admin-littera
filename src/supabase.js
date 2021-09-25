import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTg1MjAxMCwiZXhwIjoxOTMxNDI4MDEwfQ.PZtrW8vYSjrpZQQ6OX-a-oD4jXHcmNWrmC7OPtBX-lc'
const SUPABASE_URL = "https://dhhknjwtnaoyrjdgvqdj.supabase.co"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export { supabase }
