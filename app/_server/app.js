import { createApp } from '@kottster/server';
import { dataSourceRegistry } from './data-sources/registry';
import schema from '../../kottster-app.json';

export const app = createApp({
  schema,
  secretKey: 'secret_key_here',

  // Only for live demo purposes
  __readOnlyMode: true,
  __ensureValidToken: async (req) => ({ isTokenValid: true, newRequest: req })
});

app.registerDataSources(dataSourceRegistry);