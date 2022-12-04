// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from '../../lib/supabase';

export default async (req, res) => {
  const { data: sites, error } = await supabase
    .from('sites')
    .select('*')
  if (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
  console.log("sites", sites);
  res.status(200).json({ sites });
};
