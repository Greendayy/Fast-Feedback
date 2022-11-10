import React from 'react';
import useSWR, { SWRConfig } from 'swr';
import { faker } from '@faker-js/faker';

import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import SiteTable from '@/components/SiteTable';

const Dashboard = () => {
  const auth = useAuth();

  const { data } = useSWR('/api/sites', fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  // return (
  //   <DashboardShell>
  //     {data.sites.length !== 0 ? (
  //       data.sites ? (
  //         <SiteTable sites={data.sites} />
  //       ) : (
  //         <EmptyState />
  //       )
  //     ) : (
  //       <SiteTable />
  //     )}
  //   </DashboardShell>
  // );
  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
