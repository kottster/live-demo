import { TablePage } from '@kottster/react';
import { app } from '../.server/app';
import dataSource from '../.server/data-sources/postgres';
import dayjs from 'dayjs';
import GoToGithubButton from '../components/goToGithubButton';

export const action = app.defineTableController(dataSource, {
  select: {
    executeQuery: async () => {
      const knex = dataSource.adapter.getClient();

      const { rows } = await knex.raw(`
          SELECT
            dates.date::date as date,
            (random() * 400 + 100)::int as daily_active_users,
            (random() * 250 + 50)::int as unique_course_opens,
            (random() * 40 + 10)::int as unique_course_shares,
            (random() * 25 + 5)::int as unique_course_completions,
            (random() * 17 + 3)::int as courses_purchased,
            (random() * 950 + 50)::numeric(10,2) as course_revenue,
            (random() * 14 + 1)::int as new_subscribers,
            (random() * 10)::int as subscription_cancellations,
            (random() * 1500 + 500)::int as total_active_subscriptions,
            (random() * 1900 + 100)::numeric(10,2) as new_subscription_revenue,
            (random() * 650 + 150)::int as total_activities
          FROM generate_series(
            CURRENT_DATE - INTERVAL '29 days',
            CURRENT_DATE,
            '1 day'
          ) as dates(date)
          ORDER BY dates.date DESC;
        `);

      return {
        records: rows
      };
    }
  }
});

export default () => (
  <TablePage
    headerRightSection={
      <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/usageMetrics.jsx' />
    }
    headerBottomSection={
      <p className='text-gray-600 mt-4'>
        A table displays data fetched using a custom SQL query. The data is
        randomly generated for the last 30 days.
      </p>
    }
    columns={[
      {
        column: 'date',
        label: 'Date',
        width: 120,
        render: (r) => dayjs(r.date).format('MMM D, YYYY')
      },
      {
        column: 'daily_active_users',
        label: 'Daily Active Users'
      },
      {
        column: 'unique_course_opens',
        label: 'Unique Course Opens'
      },
      {
        column: 'unique_course_shares',
        label: 'Unique Course Shares'
      },
      {
        column: 'unique_course_completions',
        label: 'Unique Course Completions'
      },
      {
        column: 'courses_purchased',
        label: 'Courses Purchased'
      },
      {
        column: 'course_revenue',
        label: 'Course Revenue',
        render: (r) => `$${(+r.course_revenue).toLocaleString()}`
      },
      {
        column: 'new_subscribers',
        label: 'New Subscribers'
      },
      {
        column: 'subscription_cancellations',
        label: 'Subscription Cancellations'
      },
      {
        column: 'total_active_subscriptions',
        label: 'Total Active Subscriptions'
      },
      {
        column: 'new_subscription_revenue',
        label: 'New Subscription Revenue',
        render: (r) => `$${(+r.new_subscription_revenue).toLocaleString()}`
      },
      {
        column: 'total_activities',
        label: 'Total Activities'
      }
    ]}
  />
);
