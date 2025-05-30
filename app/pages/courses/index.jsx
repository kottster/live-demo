import { TablePage } from '@kottster/react';
    
export default () => (
  <TablePage
    customColumns={[
      // Add custom course column at the beginning
      {
        column: 'course',
        label: 'Course',
        width: 300,
        position: 0,
        hiddenInForm: true,
        render: (r) => (
          <div className='flex flex-col gap-1 items-start'>
            <span className='font-semibold'>{r.name}</span>
            <span className='text-gray-500 text-xs overflow-hidden text-ellipsis max-w-full'>
              {r.description}
            </span>
          </div>
        )
      },
    ]}
    columnOverrides={{
      // Show course type in a human-readable format
      type: (column) => ({
        ...column,
        render: (r) =>
          ({
            FREE: 'Free',
            INCLUDED_IN_SUBSCRIPTION: 'Included',
            PAID: 'Paid'
          }[r.type])
      }),

      // Show link as a clickable link instead of a plain text
      link: (column) => ({
        ...column,
        render: (r) => (
          <a
            href={r.link}
            target='_blank'
            rel='noreferrer'
            className='text-blue-600'
          >
            Open
          </a>
        )
      })
    }}
  />
);