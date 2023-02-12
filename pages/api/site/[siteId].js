import { getSite } from '@/lib/db-admin';

export default async function handler(req, res) {
  try {
    const { query, method, body } = req
    console.log("site api", query, method, body);
    const { siteId } = query;
    const r = await getSite(siteId);
    console.log('get siteId api:', r);

    res.status(200).json( r[0] );
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
  // console.log('get siteId', res);
};
