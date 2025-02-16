import React from 'react';
import { Page } from '@kottster/react';
import { Link } from '@remix-run/react';

const linkGroups = [
  {
    title: 'Examples of table pages',
    links: [
      {
        path: '/users',
        title: 'Users',
        description: 'Allows to view and edit user data'
      },
      {
        path: '/instructors',
        title: 'Instructors',
        description: 'Shows data with custom column rendering'
      },
      {
        path: '/courses',
        title: 'Courses',
        description: 'Supports create, read, update, and delete (CRUD)'
      },
      {
        path: '/payments',
        title: 'Payments',
        description: 'Displays data from linked tables'
      },
      {
        path: '/usageMetrics',
        title: 'Usage Metrics',
        description: 'Displays data from a custom SQL query'
      }
    ]
  },
  {
    title: 'Examples of custom pages',
    links: [
      {
        path: '/analyticsDashboard',
        title: 'Analytics Dashboard',
        description: 'Dashboard with statistics and a chart'
      }
    ]
  }
];

export default () => {
  return (
    <Page title='Admin Panel Demo'>
      <p className='text-gray-600 mb-9 -mt-4'>
        This live demo shows the type of admin panel you can build with{' '}
        <a
          className='text-blue-600 font-semibold'
          href='https://kottster.app/'
          target='_blank'
        >
          Kottster
        </a>
        . You can explore the{' '}
        <a
          className='text-blue-600'
          href='https://github.com/kottster/live-demo'
          target='_blank'
        >
          source code of this admin panel on GitHub
        </a>
        .
      </p>

      <div className='flex gap-6 flex-col'>
        {linkGroups.map((group) => (
          <div key={group.title}>
            <div className='text-gray-800 mb-4 opacity-80'>{group.title}</div>

            <div className='flex gap-4 flex-wrap'>
              {group.links.map((link) => (
                <Link to={link.path} key={link.title}>
                  <div
                    key={link.title}
                    className='bg-white p-5 py-4 rounded-lg border-gray-200 border w-96 cursor-pointer'
                  >
                    <h2 className='font-semibold mb-2'>{link.title}</h2>
                    <p className='text-gray-600 text-sm'>{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};
