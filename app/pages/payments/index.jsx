import { TablePage } from '@kottster/react';
    
export default () => (
  <TablePage
    columnOverrides={{
      active: (column) => ({
        ...column,
        label: 'Active',
        render: (r) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              r.active
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {r.active ? 'Yes' : 'No'}
          </span>
        )
      }),
    }}
  />
);