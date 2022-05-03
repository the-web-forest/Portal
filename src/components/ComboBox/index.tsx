import {
  ChangeEventHandler,
  CSSProperties,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Option } from './Option';
import styles from './style.module.scss';

export interface ISelectOptionsEntity {
  label: string | number;
  value: string;
}

export type OnChangeSelect = (name: string, value: string) => void;

interface ComboBoxProps {
  placeHolder: string;
  name: string;
  value: string;
  onChange: OnChangeSelect;
  options: ISelectOptionsEntity[];
  width?: string;
}

const ComboBox = ({
  placeHolder,
  options,
  name,
  onChange,
  value,
  width = '100%',
}: ComboBoxProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleBox = (): void => {
    setOpen(prevState => !prevState);
  };

  const handleSelect = useCallback(
    (opt: string) => {
      onChange(name, opt);
    },
    [name, onChange],
  );

  const mountOptionsStyles = (): CSSProperties => {
    const height = 40 * options.length;
    return {
      width,
      height: open ? `${height}px` : '0px',
      boxShadow: open
        ? 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
        : 'unset',
    };
  };

  const currentValue = useMemo(() => {
    const opt = options.find(opt => opt.value === value);
    return opt?.label;
  }, [options, value]);

  return (
    <div className={styles.container} style={{ width }} onClick={toggleBox}>
      <span className={!!value ? styles.value : styles.placeholder}>
        {currentValue || placeHolder}
      </span>
      <div className={styles.options} style={mountOptionsStyles()} id="options">
        {open && (
          <>
            {options.map(option => (
              <Option
                option={option}
                onClick={() => handleSelect(option.value)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
