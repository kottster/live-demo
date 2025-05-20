import { TablePage } from '@kottster/react';
import { app } from '../../.server/app';
import dataSource from '../../.server/data-sources/postgres';
import pageSettings from './settings.json';
import GoToGithubButton from '../../components/goToGithubButton';

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
    headerRightSection={
      <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/payments/index.jsx' />
    }
    columnOverrides={{
      active: (column) => ({
        ...column,
        label: 'Status',
        render: (r) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              r.active
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {r.active ? 'Active' : 'Canceled'}
          </span>
        )
      }),
    }}
  />
);
