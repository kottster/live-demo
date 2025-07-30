import { KnexPgAdapter } from '@kottster/server';
import knex from 'knex';

/**
 * Learn more at https://knexjs.org/guide/#configuration-options
 */
const client = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['public']
});

export default new KnexPgAdapter(client);