// import { auth } from '@/lib/firebase-admin';
// import { getUserSites } from '@/lib/db-admin';
// import { logger, formatObjectKeys } from '@/utils/logger';

// export default async (req, res) => {
//   try {
//     const { uid } = await auth.verifyIdToken(req.headers.token);
//     const { sites } = await getUserSites(uid);

//     res.status(200).json({ sites });
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
//Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from '@/lib/supabase';

export default async (req, res) => {
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
