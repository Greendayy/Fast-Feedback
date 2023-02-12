

import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { data: feedback, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
  console.log('feedback', feedback);
  res.status(200).json({ feedback });
};
