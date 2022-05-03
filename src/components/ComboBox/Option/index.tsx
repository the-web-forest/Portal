import { CSSProperties, FC, useState } from 'react';
import { ISelectOptionsEntity } from '..';
import styles from './styles.module.scss';

interface OptionProps {
  readonly option: ISelectOptionsEntity;
  readonly onClick: () => void;
}
export const Option: FC<OptionProps> = ({ option, onClick }) => {
  const [hover, setHover] = useState<boolean>(false);

  const applyHover = (): void => {
    setHover(true);
  };

  const removeHover = (): void => {
    setHover(false);
  };

  const applyHoverStyle = (): CSSProperties => {
    return {
      backgroundColor: 'rgba(0, 115, 0, 0.15)',
    };
  };

  return (
    <div
      key={option.value}
      className={styles.option}
      onClick={onClick}
      onMouseOver={applyHover}
      onMouseLeave={removeHover}
      style={hover ? { ...applyHoverStyle() } : {}}
    >
      <span className={styles.value}>{option.label}</span>
    </div>
  );
};
