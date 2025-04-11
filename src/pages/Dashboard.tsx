
import React from 'react';
import { useManhwa } from '@/context/ManhwaContext';
import DashboardSummaryCards from '@/components/dashboard/DashboardSummaryCards';
import ReadingStatusChart from '@/components/dashboard/ReadingStatusChart';
import RecentlyReadList from '@/components/dashboard/RecentlyReadList';
import ReadingHistory from '@/components/dashboard/ReadingHistory';
import TopGenres from '@/components/dashboard/TopGenres';

const Dashboard: React.FC = () => {
  const { manhwaList } = useManhwa();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Reading Dashboard</h1>
      
      {/* Summary cards */}
      <DashboardSummaryCards manhwaList={manhwaList} />
      
      {/* Reading status chart and Recently read */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReadingStatusChart manhwaList={manhwaList} />
        <RecentlyReadList manhwaList={manhwaList} />
      </div>
      
      {/* Reading history and genres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReadingHistory manhwaList={manhwaList} />
        <TopGenres manhwaList={manhwaList} />
      </div>
    </div>
  );
};

export default Dashboard;
