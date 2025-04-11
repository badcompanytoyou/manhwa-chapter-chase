
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Manhwa } from '@/types';

interface ReadingStatusChartProps {
  manhwaList: Manhwa[];
}

const ReadingStatusChart: React.FC<ReadingStatusChartProps> = ({ manhwaList }) => {
  // Reading status counts
  const reading = manhwaList.filter(m => m.reading).length;
  const completed = manhwaList.filter(m => 
    m.chapters.length > 0 && 
    m.chapters.every(c => c.isRead)
  ).length;
  const onHold = manhwaList.filter(m => m.onHold).length;
  const dropped = manhwaList.filter(m => m.dropped).length;
  const planToRead = manhwaList.filter(m => m.planToRead).length;
  const rereading = manhwaList.filter(m => m.rereading).length;

  // Data for pie chart
  const statusData = [
    { name: 'Reading', value: reading, color: '#3b82f6' },
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'On Hold', value: onHold, color: '#f59e0b' },
    { name: 'Dropped', value: dropped, color: '#ef4444' },
    { name: 'Plan to Read', value: planToRead, color: '#8b5cf6' },
    { name: 'Re-reading', value: rereading, color: '#ec4899' },
  ].filter(item => item.value > 0);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Reading Status</CardTitle>
        <CardDescription>Distribution of your manhwa collection</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        {statusData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReadingStatusChart;
