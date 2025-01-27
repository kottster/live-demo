import { useState } from 'react';
import { executeCustomAction, Page, usePage } from '@kottster/react';
import DashboardStat from '../components/dashboardStat';
import GoToGithubButton from '../components/goToGithubButton';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import dataSource from '../.server/data-sources/postgres';
import { app } from '../.server/app';
import { useEffect } from 'react';

export const action = app.defineCustomController({
  get knex() {
    return dataSource.adapter.getClient();
  },

  getStatsData: async function () {
    const [userCount, courseCount, instructorCount, totalRevenue] =
      await Promise.all([
        this.knex('users').count('id as count').first(),
        this.knex('courses').count('id as count').first(),
        this.knex('instructors').count('id as count').first(),
        this.knex('payments').sum('amount as total').first()
      ]);

    return {
      totalUsers: Number(userCount?.count || 0),
      totalCourses: Number(courseCount?.count || 0),
      totalInstructors: Number(instructorCount?.count || 0),
      totalRevenue: Math.round(totalRevenue?.total || 0)
    };
  },

  getChartsData: async function () {
    // Get just the last signup date
    const { date: lastSignupDate } = await this.knex('users')
      .max('created_at as date')
      .first();

    // Extract data for the chart, looking back 30 days
    const { rows: chartData } = await this.knex.raw(
      `
      WITH dates AS (
        SELECT generate_series(
          date(?) - interval '30 days',
          date(?),
          '1 day'
        )::date as date
      ),
      daily_signups AS (
        SELECT 
          date(created_at) as date,
          count(id) as daily_users
        FROM users
        GROUP BY date(created_at)
      )
      SELECT 
        dates.date,
        coalesce(
          sum(coalesce(daily_signups.daily_users, 0)) 
          over (order by dates.date),
          0
        ) as total_users
      FROM dates
      LEFT JOIN daily_signups ON dates.date = daily_signups.date
      ORDER BY dates.date;
    `,
      [lastSignupDate, lastSignupDate]
    );

    return chartData.map((row) => ({
      name: new Date(row.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short'
      }),
      totalUsers: Number(row.total_users)
    }));
  }
});

export default () => {
  const { navItem } = usePage();
  const [statData, setStatData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const fetchStatsData = () => {
    executeCustomAction('getStatsData')
      .then((stats) => setStatData(stats))
      .catch(console.error);
  };

  const fetchChartData = () => {
    executeCustomAction('getChartsData')
      .then((data) => setChartData(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchStatsData();
    fetchChartData();
  }, []);

  return (
    <Page
      title={navItem.name}
      headerRightSection={
        <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/analyticsDashboard.jsx' />
      }
    >
      <p className='text-gray-600 mb-9 -mt-4'>
        A page with a custom dashboard displaying various statistics and a
        chart. It is built using Tailwind CSS and Recharts.
      </p>

      <div className='grid grid-cols-4 gap-4'>
        <DashboardStat title='Total Users' value={statData?.totalUsers} />
        <DashboardStat title='Total Courses' value={statData?.totalCourses} />
        <DashboardStat
          title='Total Instructors'
          value={statData?.totalInstructors}
        />
        <DashboardStat
          title='Total Revenue'
          value={statData?.totalRevenue}
          prefix='$'
        />
      </div>

      <div className='mt-6'>
        <div className='border p-6 rounded-lg bg-white'>
          <div className='text-md/none font-medium'>User Growth</div>

          <div className='mt-6'>
            <ResponsiveContainer width='100%' height={400}>
              <AreaChart data={chartData ?? []}>
                <defs>
                  <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#0145ff' stopOpacity={0.3} />
                    <stop offset='95%' stopColor='#e0e5fa' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  stroke='var(--color-lighter)'
                  strokeDasharray='0'
                />
                <XAxis
                  dataKey='name'
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickFormatter={(value, index) => (index === 0 ? '' : value)}
                  tick={{ fontSize: '12px' }}
                  tickLine={false}
                />
                <YAxis
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Area
                  dataKey='totalUsers'
                  stroke='#0145ff'
                  fill='url(#colorPv)'
                  strokeWidth={2.5}
                  type='monotone'
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Page>
  );
};
