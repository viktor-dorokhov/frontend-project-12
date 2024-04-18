import React from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';

function CustomSpinner() {
  const { t } = useTranslation();
  return (
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">{t('main.loading')}</span>
    </Spinner>
  );
}

export default CustomSpinner;
