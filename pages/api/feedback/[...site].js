import { getAllFeedback } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const [siteId, route] = req.query.site;
    const r = await getAllFeedback(siteId, route);

    console.log('siteId', siteId);
    res.status(200).json( {data:r.data} );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
