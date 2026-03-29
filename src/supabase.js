import { createClient } from '@supabase/supabase-js'

// Your project details
const supabaseUrl = 'https://hjtwvqtsumrwreffbbxq.supabase.co'
const supabaseAnonKey = 'sb_publishable__zw7czPBv-HKyUGmox_Ogg_Iuc0VF-f'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)