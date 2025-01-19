import { Page, usePage } from '@kottster/react';
import DashboardStat from '../components/dashboardStat';
import GoToGithubButton from '../components/goToGithubButton';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import dataSource from '../.server/data-sources/postgres';

export const loader = async () => {
  const knex = dataSource.adapter.getClient();

  // Extract data for the stats
  const [userCount, courseCount, instructorCount, totalRevenue] = await Promise.all([
    knex('users').count('id as count').first(),
    knex('courses').count('id as count').first(),
    knex('instructors').count('id as count').first(),
    knex('payments').sum('amount as total').first(),
  ]);
  const statData = {
    totalUsers: Number(userCount?.count || 0),
    totalCourses: Number(courseCount?.count || 0),
    totalInstructors: Number(instructorCount?.count || 0),
    totalRevenue: Math.round(totalRevenue?.total || 0),
  };
  
  // Get the date range from first to last user signup
  const [firstSignup, lastSignup] = await Promise.all([
    knex('users').min('created_at as date').first(),
    knex('users').max('created_at as date').first(),
  ]);

  // Extract data for the chart
  const chartData = await knex
    .with('dates', (qb) => {
      qb.select(knex.raw("generate_series(date(?), date(?), '1 day')::date as date", [firstSignup.date, lastSignup.date]));
    })
    .with('daily_signups', (qb) => {
      qb.select(
        knex.raw('date(created_at) as date'),
        knex.raw('count(id) as daily_users')
      )
      .from('users')
      .groupBy(knex.raw('date(created_at)'));
    })
    .select(
      'dates.date',
      knex.raw(`
        coalesce(
          sum(coalesce(daily_signups.daily_users, 0)) 
          over (order by dates.date),
          0
        ) as total_users
      `)
    )
    .from('dates')
    .leftJoin('daily_signups', 'dates.date', 'daily_signups.date')
    .orderBy('dates.date');

  return json({
    statData,
    chartData: chartData.map(row => ({
      name: new Date(row.date).toLocaleDateString('en-US', { 
        day: '2-digit',
        month: 'short'
      }),
      totalUsers: Number(row.total_users)
    })),
  });
};

export default () => {
  const { statData, chartData } = useLoaderData();
  const { navItem } = usePage();

  return (
    <Page
      title={navItem.name}
      headerRightSection={(
        <GoToGithubButton link='https://github.com/kottster/demo-app/blob/main/app/routes/analyticsDashboard.jsx' />
      )}
    >
      <p className='text-gray-600 mb-9 -mt-4'>
        A page with a custom dashboard displaying various statistics and a chart. It is built using Tailwind CSS and Recharts.
      </p>

      <div className="grid grid-cols-4 gap-4">
        <DashboardStat title="Total Users" value={statData.totalUsers} />
        <DashboardStat title="Total Courses" value={statData.totalCourses} />
        <DashboardStat title="Total Instructors" value={statData.totalInstructors} />
        <DashboardStat title="Total Revenue" value={statData.totalRevenue} prefix='$' />
      </div>

      <div className="mt-6">
        <div className="border p-6 rounded-lg bg-white">
          <div className="text-md/none font-medium">User Growth</div>

          <div className="mt-6">
            <ResponsiveContainer width='100%' height={400}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0145ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#e0e5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  stroke="var(--color-lighter)"
                  strokeDasharray="0"
                />
                <XAxis
                  dataKey="name"
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickFormatter={(value, index) => index === 0 ? '' : value}
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
                  dataKey="totalUsers"
                  stroke="#0145ff"
                  fill="url(#colorPv)"
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
