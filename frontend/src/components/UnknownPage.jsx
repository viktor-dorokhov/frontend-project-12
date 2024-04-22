import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';

import errorImage from '../assets/error.png';

const UnknownPage = () => {
  const { t } = useTranslation();
  return (
    <div className="justify-content-center align-items-center flex-column d-flex h-100">
      <Image
        style={{ width: 'min-content' }}
        src={errorImage}
        alt={t('unknownPage.title')}
      />
      <h1 className="h4 mt-4 text-muted">{t('unknownPage.title')}</h1>
      <p className="text-muted">
        {t('unknownPage.goto')}
        {' '}
        <Link to="/">{t('unknownPage.mainPage')}</Link>
      </p>
    </div>
  );
};

export default UnknownPage;
