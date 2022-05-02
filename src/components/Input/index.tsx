import { ChangeEventHandler, EventHandler } from 'react';
import styles from './styles.module.scss';

interface InputProps {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChangeFunction: ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  error?: boolean;
  width?: string;
}

const Input = ({
  type = 'text',
  name,
  placeholder = '',
  value,
  onChangeFunction,
  maxLength = 200,
  error = false,
  width = '100%',
}: InputProps) => {
  const isOnErrorState = () => error === true;

  const getClass = (): string => {
    return isOnErrorState() ? styles.error : String.call(null);
  };

  return (
    <>
      <input
        id={styles.container}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFunction}
        maxLength={maxLength}
        className={getClass()}
        style={{ width }}
      />
    </>
  );
};

export default Input;
