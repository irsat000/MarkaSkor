import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/main.css';
import './css/header.css';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const root = createRoot(document.getElementById('root'));


root.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>
);
