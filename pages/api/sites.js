
import { supabase } from '@/lib/supabase';

export default async function handler (req, res) {
  const { data: sites, error } = await supabase
    .from('sites')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
  console.log('sites', sites);
  res.status(200).json({ sites });
};
