import React from 'react';
import { IconSrc } from '@utils/icon';
import type { ElementType } from '@constants';
import clsx from 'clsx';

interface DamageDetailsProps {
  attack?: number;
  elementType?: keyof typeof ElementType;
  elementAttack?: number;
  critical?: number;
}

export const DamageDetails = ({
  attack,
  elementAttack,
  elementType,
  critical,
}: DamageDetailsProps) => {
  return (
    <div className="flex gap-4 text-xs">
      <div className="flex gap-0.5 items-center">
        <img src={IconSrc.ATTACK} className="h-[20px] self-start" />
        <span>{attack || '-'}</span>
      </div>

      {!!elementAttack && !!elementType && (
        <div className="flex gap-0.5 items-center">
          {elementType === 'NO_ELEMENT' ? (
            <img src={IconSrc.ATTACK} className="h-[20px] self-start" />
          ) : (
            <img src={IconSrc.ELEMENT(elementType)} className="h-[20px] self-start" />
          )}
          <span>{elementAttack || '-'}</span>
        </div>
      )}

      <div className={clsx('flex gap-0.5 items-center', !critical && 'opacity-40')}>
        <img src={IconSrc.CRITICAL} className="h-[20px] self-start" />
        <span>{critical ? `${critical}%` : '0%'}</span>
      </div>
    </div>
  );
};
