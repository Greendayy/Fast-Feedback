// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from '@/lib/firebase-admin';
export default async (_, res) => {
  const snapshot = await db.collection('sites').get();
  const sites = [];
  // console.log("snapshot",snapshot.docs,snapshot.size);
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ sites });
};

// import { getAllSites } from '@/lib/db-admin';

// export default async (_, res) => {
//   const result = await getAllSites();

//   if (result.error) {
//     res.status(500).json({ error: result.error });
//   }

//   res.status(200).json({ sites: result.sites });
// };
