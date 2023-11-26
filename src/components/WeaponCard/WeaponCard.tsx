import React from 'react';
import type { CollectionEntry } from 'astro:content';
import { useTranslation } from '@i18n/useTranslation';
import { type LocaleCode } from '@i18n/utils';
import { IconSrc } from '@utils/icon';
import { GradePillSelect } from './GradePillSelect';
import { DamageDetails } from './DamageDetails';

type GradeAndLevelOption = {
  label: React.ReactNode;
  value: string;
};

interface Props {
  data: CollectionEntry<'weapon'>[];
  locale: LocaleCode;
}

export default ({ data, locale }: Props) => {
  const gradeAndLevelOptions = data.reduce((options: GradeAndLevelOption[], { data }) => {
    const grade = data.grade;
    const optionsForGrade = data._levels.map((lvl) => {
      const value = [grade, lvl.level].join('-');
      return { value, label: value };
    });
    return [...options, ...optionsForGrade];
  }, []);

  const [gradeAndLevel, setGradeAndLevel] = React.useState(gradeAndLevelOptions.slice(-1)[0].value);
  const [grade, level] = gradeAndLevel.split('-').map((i) => parseInt(i, 10));
  const t = useTranslation(locale);

  const weapon = data.find((obj) => obj.data.grade === grade);
  const attack = weapon?.data._levels.find((obj) => obj.level === level);

  return (
    <div className="w-full flex flex-col gap-4 lg:w-[300px]">
      <div className="flex gap-1 justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          <img src={IconSrc.WEAPON_TYPE(weapon?.data.category)} className="h-[18px]" />
          <h3 className="text-sm font-semibold">
            {weapon?.data.weaponId ? t(`Weapon/NAME_${weapon.data.weaponId}`) : '-'}
          </h3>
        </div>
        <GradePillSelect
          placeholder={gradeAndLevel}
          options={gradeAndLevelOptions}
          value={gradeAndLevel}
          onChange={setGradeAndLevel}
          bgColor={gradeTailwindColor(grade)}
        />
      </div>

      <div className="flex gap-4">
        <img
          src={`/curly-octo-waffle/weapons/spr_ui_thumb_${weapon?.data.assetKey}.png`}
          className="w-[100px] self-start"
        />
        <div className="flex flex-col w-full gap-4">
          <DamageDetails
            elementType={weapon?.data.elementType}
            attack={attack?.attack}
            elementAttack={attack?.elementAttack}
            critical={attack?.critical}
          />
          <div className="bg-zinc-700 w-full h-[1px]" />
          <div className="text-xs">SKILLS</div>
        </div>
      </div>
    </div>
  );
};

const gradeTailwindColor = (grade: number): string => {
  if (grade === 1) return 'bg-slate-600';
  else if (grade === 2) return 'bg-green-700';
  else if (grade === 3) return 'bg-blue-600';
  else if (grade === 4) return 'bg-purple-700';
  else if (grade === 5) return 'bg-yellow-500';
  return 'bg-rose-500';
};
