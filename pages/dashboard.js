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
  // console.log("user.token",user?.token)
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
