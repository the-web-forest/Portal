import React, { useCallback, useMemo } from 'react';
import Select, { components, Props } from 'react-select';
import styles from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useScreen } from '../../providers/screen';

export interface ISelectOptionsEntity {
  value: string;
  label: string;
}

export type OnChangeSelect = (name: string, value: string) => void;

interface SelectProps {
  placeHolder: string;
  name: string;
  value: string | null;
  onChange: OnChangeSelect;
  options: ISelectOptionsEntity[];
  width?: string;
  error?: string;
  noOptionsMessage?: string;
}

const CustomSelect = ({
  placeHolder,
  options,
  name,
  onChange,
  value,
  error,
  width = '100%',
  noOptionsMessage,
}: SelectProps) => {
  const { isMobile } = useScreen();

  const handleSelect = useCallback(
    (opt: string) => {
      onChange(name, opt);
    },
    [name, onChange],
  );

  const customStyles = {
    option: (
      provided: any,
      state: { isSelected: boolean; isFocused: boolean },
    ) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(0, 115, 0, 0.15)' : 'white',
      color: 'var(--chakra-colors-chakra-body-text)',
      cursor: 'pointer',
    }),
    control: (styles: any) => ({
      ...styles,
      backgroundColor: 'white',
      border: 0,
      boxShadow:
        'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      cursor: 'pointer',
      width: isMobile ? '100%' : width,
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: 'var(--dark-gray)',
      right: '10px',
      top: '10px',
    }),
  };

  const currentValue = useMemo(() => {
    const opt = options.find(opt => opt.value === value) ?? null;
    return opt;
  }, [options, value]);

  return (
    <div className={styles.selectDiv}>
      <Select
        menuPosition="fixed"
        styles={customStyles}
        options={options}
        placeholder={placeHolder}
        name={name}
        onChange={option => handleSelect(option?.value ?? '')}
        value={currentValue}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: (props: any) => {
            return (
              <components.DropdownIndicator {...props}>
                <FontAwesomeIcon icon={faCaretDown} size="xl" />
              </components.DropdownIndicator>
            );
          },
        }}
        noOptionsMessage={() => noOptionsMessage ?? 'Nenhuma opção disponível'}
      />
      {error && <span className={styles.errorText}>* {error}</span>}
    </div>
  );
};

export default CustomSelect;
