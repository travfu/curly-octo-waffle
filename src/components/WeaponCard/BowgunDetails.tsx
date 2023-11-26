import React from 'react';
import type { CollectionEntry } from 'astro:content';
import type { LocaleCode } from '@i18n/utils';
import { useTranslation } from '@i18n/useTranslation';
import { ElementType } from '@constants';
import { IconSrc } from '@utils/icon';

interface BowgunDetailsProps {
  locale: LocaleCode;
  ammoProperties: NonNullable<CollectionEntry<'weapon'>['data']['_bowgun']>['ammoProperty'];
}

export const BowgunDetails = ({ locale, ammoProperties }: BowgunDetailsProps) => {
  return (
    <div className="text-xs flex flex-col gap-1">
      {ammoProperties.map((obj) => (
        <Ammo key={obj.bowgunAmmoSettingsId} locale={locale} data={obj} />
      ))}
    </div>
  );
};

interface AmmoProps {
  locale: LocaleCode;
  data: BowgunDetailsProps['ammoProperties'][number];
}

const Ammo = ({ locale, data }: AmmoProps) => {
  const t = useTranslation(locale);
  const {
    capacity,
    _ammo: { ammoType, elementType, htmlColorCode },
  } = data;

  const name = t(toNameKey(ammoType, elementType));
  const label = [capacity, 'x', name].join(' ');

  return (
    <div>
      <div className="flex gap-1">
        <img src={IconSrc.BOWGUN_AMMO(ammoType)} className="w-[15px]" />
        <div>{label}</div>
      </div>
    </div>
  );
};

const toNameKey = (ammoType: string, elementType: keyof typeof ElementType) => {
  if (elementType === 'NO_ELEMENT') {
    return `Ammo/${ammoType}1`;
  }

  if (ammoType === 'NORMAL') {
    switch (elementType) {
      case 'FIRE':
        return 'Ammo/FLAMING';
      case 'ICE':
        return 'Ammo/FREEZE';
      default:
        return `Ammo/${elementType}`;
    }
  }

  switch (elementType) {
    case 'ICE':
      return `Ammo/${ammoType}_FREEZE`;
    default:
      return `Ammo/${ammoType}_${elementType}`;
  }
};
