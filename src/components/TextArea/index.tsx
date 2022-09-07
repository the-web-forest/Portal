import stylesNormal from './styles.module.scss';
import stylesLight from './styles.light.module.scss';

interface TextAreaProps {
  skin: 'normal' | 'light';
  name: string;
  cols: number;
  rows: number;
  placeholder: string;
  maxLength: number;
  value: string;
  onChangeFunction: (val: string) => void;
  error?: boolean;
  disabled?: boolean;
}

const TextArea = ({
  cols,
  rows,
  name,
  placeholder,
  maxLength,
  value,
  onChangeFunction,
  error = false,
  skin,
  disabled = false,
}: TextAreaProps) => {
  const isOnErrorState = () => error === true;

  const getClass = (): string => {
    return isOnErrorState() ? styles.error : String.call(null);
  };

  const styles = skin == 'normal' ? stylesNormal : stylesLight;

  return (
    <textarea
      name={name}
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={e => onChangeFunction(e.target.value)}
      className={styles.container}
      disabled={disabled}
    />
  );
};

export default TextArea;
