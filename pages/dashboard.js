import React from 'react';
import useSWR from 'swr';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTable from '@/components/SiteTable';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import SiteTableHeader from '@/components/SiteTableHeader';
import dbFaker from '@/lib/db-faker';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
  // const sites = data?.sites;
  console.log(data);
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;

// import React from 'react';
// import useSWR, { SWRConfig } from 'swr';

// import DashboardShell from '@/components/DashboardShell';
// import EmptyState from '@/components/EmptyState';
// import fetcher from '@/utils/fetcher';
// import SiteTableSkeleton from '@/components/SiteTableSkeleton';
// import { useAuth } from '@/lib/auth';
// import SiteTable from '@/components/SiteTable';
// import dbFaker from '@/lib/db-faker';

// const Dashboard = () => {
//   const auth = useAuth();

//   const { data } = useSWR('/api/sites', fetcher);

//   if (!data) {
//     return (
//       <DashboardShell>
//         <SiteTableSkeleton />
//       </DashboardShell>
//     );
//   }

//   return (
//     <DashboardShell>
//       {data.sites.length > 0 ? (
//         data.sites ? (
//           <SiteTable sites={data.sites} />
//         ) : (
//           <EmptyState />
//         )
//       ) : (
//         <SiteTable sites={dbFaker} />
//       )}
//     </DashboardShell>
//   );
// };

// export default Dashboard;
