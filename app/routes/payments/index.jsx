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
  />
);
