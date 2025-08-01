import App from '@/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
                
            </BrowserRouter>
        </React.StrictMode>,
    );
}
