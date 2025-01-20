import { Outlet } from '@remix-run/react';
import { KottsterApp, ClientOnly, getRootLayout } from '@kottster/react';
import '@kottster/react/dist/style.css';
import schema from '../app-schema.json';
import './tailwind.css';

function ClientApp() {
  return (
    <KottsterApp.Provider
      schema={schema}
      // Only for demo purposes
      __readOnlyMode
      __appData={{
        app: {
          id: 1,
        },
        user: {
          id: 1,
          email: 'demo@kottster.app',
          avatarUrl: '',
          firstName: 'Demo user',
          role: 'admin',
          permissions: [],
        },
        stage: 'development',
      }}
    >
      <Outlet />
    </KottsterApp.Provider>
  );
}

export default function App() {
  return (
    <ClientOnly>
      <ClientApp />
      {/* <script 
        __dangerouslySetInnerHTML={{ 
          __html: 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__' 
        }} 
      /> */}
    </ClientOnly>
  );
}

export const links = () => [
  {
    rel: 'script',
    href: '/analytics.js',
    async: false
  }
];

export const Layout = getRootLayout({ schema });
export { App as ErrorBoundary };
