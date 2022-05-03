import { ChangeEventHandler } from 'react';
import styles from './styles.module.scss';

interface InputProps {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChangeFunction: ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  error?: string;
  width?: string;
}

const Input = ({
  type = 'text',
  name,
  placeholder = '',
  value,
  onChangeFunction,
  maxLength = 200,
  error,
  width = '100%',
}: InputProps) => {
  const getClass = (): string => {
    return !!error ? styles.error : String.call(null);
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
      {error && <span>* {error}</span>}
    </>
  );
};

export default Input;
