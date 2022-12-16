// import { auth } from '@/lib/firebase-admin';
// import { getAllFeedbackForSites } from '@/lib/db-admin';
// import { logger, formatObjectKeys } from '@/utils/logger';

// export default async (req, res) => {
//   try {
//     const { uid } = await auth.verifyIdToken(req.headers.token);
//     const { feedback } = await getAllFeedbackForSites(uid);

//     res.status(200).json({ feedback });
//   } catch (error) {
//     logger.error(
//       {
//         request: {
//           headers: formatObjectKeys(req.headers),
//           url: req.url,
//           method: req.method
//         },
//         response: {
//           statusCode: res.statusCode
//         }
//       },
//       error.message
//     );

//     res.status(500).json({ error });
//   }
// };

import { supabase } from '../../lib/supabase';

export default async (req, res) => {
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
