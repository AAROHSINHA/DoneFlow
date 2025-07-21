// main.tsx or wherever you use it
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { browserTracingIntegration } from '@sentry/react';

import App from './App.tsx';
import './index.css';

// Initialize Sentry
Sentry.init({
  dsn: 'https://6fa42d5b8beb403bd54bfce6b757b306@o4509705561636864.ingest.de.sentry.io/4509705564979280',
  integrations: [browserTracingIntegration()],
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

// Wrap App in Sentry error boundary
const AppWithErrorBoundary = Sentry.withErrorBoundary(App, {
  fallback: <p>Something went wrong!</p>,
  showDialog: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithErrorBoundary />
  </StrictMode>
);


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
