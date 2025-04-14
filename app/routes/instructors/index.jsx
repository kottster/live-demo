import { TablePage } from '@kottster/react';
import { app } from '../../.server/app';
import dataSource from '../../.server/data-sources/postgres';
import pageSettings from './settings.json';
import dayjs from 'dayjs';

/**
 * Learn more about configuring the table controller:
 * https://docs.kottster.app/table/configuration/api
 */
export const action = app.defineTableController(dataSource, {
  ...pageSettings
});

/**
 * Learn more about TablePage component and its properties:
 * https://docs.kottster.app/table/table-page-component
 */
export default () => (
  <TablePage
    columnTransformer={(columns) => [
      // Add custom full_name column at the beginning
      {
        label: 'Full Name',
        width: 220,
        render: (r) => (
          <div className='flex gap-2 items-center'>
            <img src={r.avatar_url} alt='' className='w-6 h-6 rounded-full' />
            <span className='font-semibold'>
              {r.first_name} {r.last_name}
            </span>
          </div>
        )
      },

      ...columns
    ]}
    columnOverrides={{
      email: (column) => ({
        ...column,
        render: (r) => (
          <a className='text-blue-700' href={`mailto:${r.email}`}>
            {r.email}
          </a>
        )
      }),
      phone_number: (column) => ({
        ...column,
        render: (r) => (
          <a className='text-blue-700' href={`tel:${r.phone_number}`}>
            {r.phone_number}
          </a>
        )
      }),
      active: (column) => ({
        ...column,
        render: (r) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              r.active
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {r.active ? 'Active' : 'Inactive'}
          </span>
        )
      }),
      joined_at: (column) => ({
        ...column,
        render: (r) => dayjs(r.joined_at).fromNow()
      })
    }}
  />
);
