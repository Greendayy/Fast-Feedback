import { getSite } from '@/lib/db-admin';

export default async function handler(req, res) {
  try {
    const { query, method, body } = req
    console.log("site api", query, method, body);
    const { siteId } = query;
    console.log('get siteId api:', siteId);
    const r = await getSite(siteId);

    res.status(200).json({ data: r.data });
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
  // console.log('get siteId', res);
};
