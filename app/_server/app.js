import { createApp } from '@kottster/server';
import schema from '../../kottster-app.json';

export const app = createApp({
  schema,
  secretKey: 'secret_key_here',

  // Only for live demo purposes
  __readOnlyMode: true,
  __ensureValidToken: async (req) => ({ 
    isTokenValid: true, 
    newRequest: req,
    user: {
      id: '1',
      email: 'demo@kottster.app',
      role: {
        id: '1',
        name: 'Administrator',
      }
    }
  })
});