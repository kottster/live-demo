import { Page, usePage } from '@kottster/react';
import { Table } from '@kottster/react';
import { app } from '../.server/app';
import dataSource from '../.server/data-sources/postgres';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import GoToGithubButton from '../components/goToGithubButton';

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

export const action = app.defineTableController(dataSource, {
  table: 'instructors',
  primaryKeyColumn: 'id',
  select: {
    pageSize: 20,
    excludeColumns: ['created_at', 'updated_at', 'joined_at'],
    searchableColumns: ['first_name', 'last_name', 'email', 'phone_number'],
    sortableColumns: ['id', 'active']
  },
  update: true
});

export default () => {
  const { navItem } = usePage();

  return (
    <Page
      title={navItem.name}
      headerRightSection={
        <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/instructors.jsx' />
      }
    >
      <p className='text-gray-600 mb-9 -mt-4'>
        A table displaying data from the "instructors" database table with
        custom column rendering (e.g. avatar, full name, status, mailto/tel
        links).
      </p>

      <Table
        columns={[
          {
            column: 'full_name',
            width: 220,
            render: (r) => (
              <div className='flex gap-2 items-center'>
                <img
                  src={r.avatar_url}
                  alt=''
                  className='w-6 h-6 rounded-full'
                />
                <span className='font-semibold'>
                  {r.first_name} {r.last_name}
                </span>
              </div>
            )
          },
          {
            column: 'email',
            render: (r) => (
              <a className='text-blue-600' href={`mailto:${r.email}`}>
                {r.email}
              </a>
            )
          },
          {
            column: 'phone_number',
            render: (r) => (
              <a className='text-blue-600' href={`tel:${r.phone_number}`}>
                {r.phone_number}
              </a>
            )
          },
          {
            column: 'education'
          },
          {
            label: 'Status',
            column: 'active',
            render: (r) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${r.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
              >
                {r.active ? 'Active' : 'Inactive'}
              </span>
            )
          },
          {
            label: 'Joined',
            column: 'joined_at',
            width: 160,
            render: (r) => dayjs(r.joined_at).fromNow()
          }
        ]}
      >
        <Table.RecordModal
          fields={[
            {
              column: 'first_name',
              required: false,
              formField: { type: 'input' },
              span: 6
            },
            {
              column: 'last_name',
              required: false,
              formField: { type: 'input' },
              span: 6
            },
            {
              column: 'email',
              required: false,
              formField: { type: 'input' }
            },
            {
              column: 'phone_number',
              required: false,
              formField: { type: 'input' }
            },
            {
              column: 'avatar_url',
              required: false,
              formField: { type: 'input' }
            },
            {
              column: 'education',
              required: false,
              formField: { type: 'textarea' }
            },
            {
              column: 'bio',
              required: false,
              formField: { type: 'textarea' }
            },
            {
              column: 'active',
              required: true,
              formField: { type: 'checkbox' }
            }
          ]}
        />
      </Table>
    </Page>
  );
};
