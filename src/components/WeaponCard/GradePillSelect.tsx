import React from 'react';
import clsx from 'clsx';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';

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

export const GradePillSelect = ({
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
