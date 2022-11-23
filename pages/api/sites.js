// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  {getUID}  from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    console.log("==============token==============",req.headers.token)
    const { uid } = await getUID(req.headers.token);
    console.log("==============uid==============",uid);

    const { sites } = await getUserSites(uid);
    console.log("uid",uid,"sites",sites);
    res.status(200).json({ sites });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error:error.message });
  }
};
