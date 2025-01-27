import { startTransition, StrictMode } from 'react';
import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';
import { handleRecoverableError } from '@kottster/react';
import Hotjar from '@hotjar/browser';

// Initialize Hotjar
const siteId = 5273743;
const hotjarVersion = 6;
Hotjar.init(siteId, hotjarVersion);

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
    {
      onRecoverableError: handleRecoverableError
    }
  );
});
