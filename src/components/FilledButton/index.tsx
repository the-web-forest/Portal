import { ButtonHTMLAttributes, FC } from 'react';
import { useScreen } from '../../providers/screen';
import styles from './styles.module.scss';

export enum FilledColor {
  orange = '#EA9B02',
  darkGreen = '#00635D',
  budGreen = '#63AF53',
  green = '#28ab38',
}

interface FilledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: FilledColor;
  width?: string;
}

const FilledButton: FC<FilledButtonProps> = ({
  color = FilledColor.orange,
  width = 'auto',
  type = 'button',
  children,
  ...rest
}) => {
  const { isMobile } = useScreen();
  return (
    <button
      className={styles.container}
      type={type}
      style={{ width: isMobile ? '100%' : width, backgroundColor: color }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default FilledButton;
