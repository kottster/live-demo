import { TablePage } from '@kottster/react';
import dayjs from 'dayjs';
    
export default () => (
  <TablePage
    customColumns={[
      // Add custom full_name column at the beginning
      {
        column: 'full_name',
        label: 'Full Name',
        width: 220,
        position: 0,
        render: (r) => (
          <div className='flex gap-2 items-center'>
            <img src={r.avatar_url} alt='' className='w-6 h-6 rounded-full' />
            <span className='font-semibold'>
              {r.first_name} {r.last_name}
            </span>
          </div>
        ),
        hiddenInForm: true,
      },
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
        render: (r) => dayjs(r.joined_at).fromNow(),
      }),
    }}
  />
);