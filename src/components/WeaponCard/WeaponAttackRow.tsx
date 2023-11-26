import React from 'react';
import { IconSrc } from '@utils/icon';
import type { ElementType } from '@constants';

interface WeaponAttackRowProps {
  attack?: number;
  elementType?: keyof typeof ElementType;
  elementAttack?: number;
  critical?: number;
}

export const WeaponAttackRow = ({
  attack,
  elementAttack,
  elementType,
  critical,
}: WeaponAttackRowProps) => {
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

      <div className="flex gap-0.5 items-center">
        <img src={IconSrc.CRITICAL} className="h-[20px] self-start" />
        <span>{critical ? `${critical}%` : '-'}</span>
      </div>
    </div>
  );
};
