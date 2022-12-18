import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';

const AllFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data?.feedback?.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};

const AllFeedbackPage = () => (
  <Page name="All Feedback" path="/feedback">
    <AllFeedback />
  </Page>
);

export default AllFeedbackPage;
// import React from 'react';
// import useSWR from 'swr';

// import { useAuth } from '@/lib/auth';
// import fetcher from '@/utils/fetcher';
// import DashboardShell from '@/components/DashboardShell';
// import EmptyState from '@/components/EmptyState';
// import FeedbackTable from '@/components/FeedbackTable';
// import SiteTableSkeleton from '@/components/SiteTableSkeleton';
// import FeedbackTableHeader from '@/components/FeedbackTableHeader';

// const MyFeedback = () => {
//   const { user } = useAuth();
//   const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);
//   // const sites = data?.sites;

//   if (!data) {
//     return (
//       <DashboardShell>
//         <FeedbackTableHeader />
//         <SiteTableSkeleton />
//       </DashboardShell>
//     );
//   }

//   return (
//     <DashboardShell>
//       <FeedbackTableHeader />
//       {data.feedback.length ? (
//         <FeedbackTable allfeedback={data.feedback} />
//       ) : (
//         <EmptyState />
//       )}
//     </DashboardShell>
//   );
// };

// export default MyFeedback;
