import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/theme.css';
import './assets/global.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const root = createRoot(document.getElementById('root') as HTMLElement);


root.render(
    <BrowserRouter basename={baseUrl ?? undefined}>
        <GoogleOAuthProvider clientId="1015441130118-081foo1ejjtmauar1op55938o2ud2c1q.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </BrowserRouter>
);
