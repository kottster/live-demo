import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { appTheme, KottsterApp } from '@kottster/react';
import Hotjar from '@hotjar/browser';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '@kottster/react/dist/style.css';
import './main.css';

import schema from '../kottster-app.json';

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

// Initialize Hotjar
const siteId = 5273743;
const hotjarVersion = 6;
Hotjar.init(siteId, hotjarVersion);

const pageEntries = import.meta.glob('./pages/**/index.jsx', { eager: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider 
      theme={appTheme} 
      defaultColorScheme='light' 
      forceColorScheme='light'
    >
      <KottsterApp 
        schema={schema} 
        pageEntries={pageEntries}
        
        // Only for live demo purposes
        __demoMode
        __appData={{
          app: {
            id: 1
          },
          user: {
            id: 1,
            email: 'demo@kottster.app',
            avatarUrl: '',
            firstName: 'Demo user',
            role: 'admin',
            permissions: []
          },
          stage: 'development'
        }}
      />
    </MantineProvider>
  </React.StrictMode>
);