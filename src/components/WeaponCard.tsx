import React from 'react';
import type { CollectionEntry } from 'astro:content';
import { useTranslation } from '@i18n/useTranslation';
import { type LocaleCode } from '@i18n/utils';
import clsx from 'clsx';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { IconSrc } from '@utils/icon';

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
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-1 justify-between items-center w-full">
        <h3 className="text-sm font-semibold">
          {weapon?.data.weaponId ? t(`Weapon/NAME_${weapon.data.weaponId}`) : '-'}
        </h3>
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
          <div className="flex gap-4 text-xs">
            <div className="flex gap-0.5 items-center">
              <img src={IconSrc.ATTACK} className="h-[20px] self-start" />
              <span>{attack?.attack || '-'}</span>
            </div>
            {!!attack?.elementAttack && !!weapon?.data.elementType && (
              <div className="flex gap-0.5 items-center">
                {weapon.data.elementType === 'NO_ELEMENT' ? (
                  <img src={IconSrc.ATTACK} className="h-[20px] self-start" />
                ) : (
                  <img
                    src={IconSrc.ELEMENT(weapon.data.elementType)}
                    className="h-[20px] self-start"
                  />
                )}
                <span>{attack?.elementAttack || '-'}</span>
              </div>
            )}
            <div className="flex gap-0.5 items-center">
              <img src={IconSrc.CRITICAL} className="h-[20px] self-start" />
              <span>{attack?.critical ? `${attack.critical}%` : '-'}</span>
            </div>
          </div>
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

interface GradePillSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: React.ReactNode;
  }[];
  placeholder?: string;
  bgColor: string;
}

const GradePillSelect = ({
  placeholder,
  options,
  value,
  onChange,
  bgColor,
}: GradePillSelectProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className={clsx(
          'w-[60px] flex gap-0.5 items-center justify-around rounded-md px-2 py-1 text-xs outline-none',
          bgColor
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon className="w-3" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-zinc-900 text-white rounded-md h-80 text-sm p-2"
          position="popper"
          align="center"
        >
          <Select.Viewport className="p-[5px]">
            {options.map(({ value, label }) => (
              <Select.Item
                value={value}
                className="pl-4 pr-2 rounded hover:bg-purple-400 outline-none flex items-center"
              >
                <Select.ItemText>{label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
