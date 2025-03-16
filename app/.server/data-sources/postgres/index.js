import { createDataSource, KnexPgAdapter } from '@kottster/server';
import knex from 'knex';

const dataSource = createDataSource({
  type: 'postgres',
  name: 'postgres',
  init: () => {
    /**
     * Learn more at https://knexjs.org/guide/#configuration-options
     */
    const client = knex({
      client: 'pg',
      connection: process.env.DATABASE_URL,
      searchPath: ['public']
    });

    return new KnexPgAdapter(client);
  },
  tablesConfig: {}
});

export default dataSource;
