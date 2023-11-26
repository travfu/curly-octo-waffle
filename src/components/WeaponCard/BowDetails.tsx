import { useTranslation } from '@i18n/useTranslation';
import type { LocaleCode } from '@i18n/utils';
import React from 'react';

interface BowDetailsProps {
  locale: LocaleCode;
  arrowLocalizationKeys: string[];
}

export const BowDetails = ({ locale, arrowLocalizationKeys }: BowDetailsProps) => {
  const t = useTranslation(locale);

  return (
    <div className="text-xs">
      <div>
        <h3 className="font-semibold text-zinc-600">{t('Common/CHARGED_SHOT')}</h3>
        <ul className="pl-2">
          {arrowLocalizationKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
