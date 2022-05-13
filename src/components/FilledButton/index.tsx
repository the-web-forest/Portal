import { FC } from 'react';
import { useScreen } from '../../providers/screen';
import styles from './style.module.scss';

export enum FilledColor {
  orange = '#EA9B02',
  darkGreen = '#00635D',
  budGreen = '#63AF53',
  green = '#28ab38',
}

interface FilledButtonProps {
  color?: FilledColor;
  type?: 'button' | 'submit';
  onClickFunction?: () => void;
  width?: string;
}

const FilledButton: FC<FilledButtonProps> = ({
  type = 'button',
  onClickFunction,
  color = FilledColor.orange,
  width = 'auto',
  children,
}) => {
  const { isMobile } = useScreen();
  return (
    <button
      className={styles.container}
      style={{ width: isMobile ? '100%' : width, backgroundColor: color }}
    >
      {children}
    </button>
  );
};

export default FilledButton;
