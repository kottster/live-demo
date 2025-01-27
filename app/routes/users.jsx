import { Page, usePage } from '@kottster/react';
import { Table } from '@kottster/react';
import { app } from '../.server/app';
import dataSource from '../.server/data-sources/postgres';
import GoToGithubButton from '../components/goToGithubButton';

export const action = app.defineTableController(dataSource, {
  table: 'users',
  primaryKeyColumn: 'id',
  select: {
    pageSize: 20,
    excludeColumns: ['created_at', 'updated_at'],
    searchableColumns: ['email', 'phone_number', 'first_name', 'last_name'],
    filterableColumns: ['id'],
    sortableColumns: ['id']
  },
  update: true
});

export default () => {
  const { navItem } = usePage();

  return (
    <Page
      title={navItem.name}
      headerRightSection={
        <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/users.jsx' />
      }
    >
      <p className='text-gray-600 mb-9 -mt-4'>
        A simple table that displays data from the "users" database table and
        allows to modify it.
      </p>

      <Table
        columns={[
          {
            column: 'id'
          },
          {
            column: 'first_name'
          },
          {
            column: 'last_name'
          },
          {
            column: 'email'
          },
          {
            column: 'phone_number'
          },
          {
            column: 'created_at',
            width: 200
          }
        ]}
      >
        <Table.RecordModal
          fields={[
            {
              column: 'first_name',
              required: false,
              formField: { type: 'input' }
            },
            {
              column: 'last_name',
              required: false,
              formField: { type: 'input' }
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
            }
          ]}
        />
      </Table>
    </Page>
  );
};
