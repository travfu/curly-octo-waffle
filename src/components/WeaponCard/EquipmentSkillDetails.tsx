import { useTranslation } from '@i18n/useTranslation';
import type { LocaleCode } from '@i18n/utils';
import React from 'react';
import type { CollectionEntry } from 'astro:content';
import clsx from 'clsx';
import { PlusCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';

interface EquipmentSkillDetailsProps {
  locale: LocaleCode;
  data: NonNullable<CollectionEntry<'weapon'>['data']['_skills']>[number];
}

export const EquipmentSkillDetails = ({
  locale,
  data: { level, maxLevel, skillId, descriptionKey, skillConditionParameter, skillEffectParameter },
}: EquipmentSkillDetailsProps) => {
  const [showDesc, setShowDesc] = React.useState(false);
  const t = useTranslation(locale);
  const description = buildEquipmentSkillDescription(
    t(descriptionKey),
    skillConditionParameter,
    skillEffectParameter
  );

  return (
    <div className="flex flex-col gap-1 text-xs">
      <div className="font-semibold flex gap-3 items-center">
        {t(`SkillName/NAME_${skillId}`)}
        <button type="button" onClick={() => setShowDesc((prev) => !prev)}>
          {showDesc ? (
            <MinusCircledIcon width={15} height={15} />
          ) : (
            <PlusCircledIcon width={15} height={15} />
          )}
        </button>
      </div>
      <SkillLevel level={level} max={maxLevel} />
      {showDesc && <div className="text-zinc-600">{description}</div>}
    </div>
  );
};

const SkillLevel = ({ level, max }: { level: number; max: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: max }, (_, idx) => idx).map((_, idx) => (
      <div className={clsx('h-1 w-4  bg-yellow-400', idx + 1 > level && 'opacity-25')} />
    ))}
  </div>
);

const buildEquipmentSkillDescription = (
  template: string,
  conditions: number[] | null,
  effects: number[] | null
): string => {
  let description = template;
  effects?.forEach((val, idx) => {
    description = description.replace(`{effect_amount_${idx + 1}}`, String(val));
  });
  conditions?.forEach((val, idx) => {
    description = description.replace(`{condition_amount_${idx + 1}}`, String(val));
  });
  return description;
};
