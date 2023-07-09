import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translationEN } from './EN';
import { translationVN } from './VN';

const resources = {
    EN: { translation: translationEN },
    VN: { translation: translationVN },
};

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'EN',
    debug: false,
    lng: 'VN',

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
