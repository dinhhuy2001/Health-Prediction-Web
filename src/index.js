import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './configs/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <I18nextProvider i18n={i18n}>
        <AuthContextProvider>
            <ChatContextProvider>
                <App />
            </ChatContextProvider>
        </AuthContextProvider>
    </I18nextProvider>,
);
