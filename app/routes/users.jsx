import { Page, usePage } from '@kottster/react';
import { Table } from '@kottster/react';
import { app } from '../.server/app';
import dataSource from '../.server/data-sources/postgres';
import GoToGithubButton from '../components/goToGithubButton';

export const action = app.createTableRpc(dataSource, {
  table: 'users',
  primaryKeyColumn: 'id',
  select: {
    pageSize: 20,
    excludeColumns: ['created_at', 'updated_at'],
    searchableColumns: ['email', 'phone_number', 'first_name', 'last_name'],
    filterableColumns: ['id'],
    sortableColumns: ['id'],
  },
});

export default () => {
  const { navItem } = usePage();

  return (
    <Page
      title={navItem.name}
      headerRightSection={
        <GoToGithubButton link="https://github.com/kottster/demo-app/blob/main/app/routes/users.jsx" />
      }
    >
      <p className="text-gray-600 mb-9 -mt-4">
        A simple table that displays data from the "users" database table.
      </p>

      <Table
        columns={[
          {
            column: 'id',
          },
          {
            column: 'first_name',
          },
          {
            column: 'last_name',
          },
          {
            column: 'email',
          },
          {
            column: 'phone_number',
          },
          {
            column: 'created_at',
            width: 200,
          },
        ]}
      />
    </Page>
  );
};
