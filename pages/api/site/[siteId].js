import { getSite } from '@/lib/db-admin';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
  try {
    const { siteId } = req.query;
    console.log('get siteId api:', siteId);
    const { site } = await getSite(siteId);

    res.status(200).json({ site });
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
  // console.log('get siteId', res);
};
// import { getAllFeedback, getAllSites } from '@/lib/db-admin';
// import { Box } from '@chakra-ui/core';
// import { useRouter } from 'next/router';

// export async function getStaticProps(context) {
//   console.log('context:', context);

//   const siteId = context.params.siteId;
//   const { feedback } = await getAllFeedback(siteId);

//   return {
//     props: {
//       initialFeedback: feedback
//     },
//     revalidate: 1
//   };
// }

// export async function getStaticPaths() {
//   const { sites } = await getAllSites();
//   const paths = sites.map((site) => ({
//     params: {
//       siteId: site.id.toString()
//     }
//   }));

//   return {
//     paths,
//     fallback: true
//   };
// }

// const FeedbackPage = ({ initialFeedback }) => {
//   const router = useRouter();

//   return <Box>Site ID: {router.query.siteId}</Box>;
// };

// export default FeedbackPage;
