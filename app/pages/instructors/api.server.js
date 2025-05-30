import { app } from '../../_server/app';
import dataSource from '../../_server/data-sources/postgres';
import pageSettings from './settings.json';
      
export default app.defineTableController(dataSource, {
  ...pageSettings,
  rootTable: {
    ...pageSettings.rootTable,
    /**
     * Need more customization? Adjust the table configuration here.
     * Learn more: https://kottster.app/docs/table/configuration/api#parameters
     */
  }
});