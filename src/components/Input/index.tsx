import { ChangeEventHandler, FocusEventHandler, useState } from 'react';
import stylesNormal from './styles.module.scss';
import stylesLight from './styles.light.module.scss';
import { IoEyeOff, IoEye } from 'react-icons/io5';
import { useScreen } from '../../providers/screen';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';
import { StrUtils } from '../../utils/str-utils';

interface InputProps {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChangeFunction: ChangeEventHandler<HTMLInputElement>;
  onBlurFunction?: FocusEventHandler<HTMLInputElement>;
  maxLength?: number;
  error?: string;
  width?: string;
  showRules?: boolean;
  marginBottom?: string;
  id?: string;
  inputMode?:
    | 'text'
    | 'search'
    | 'numeric'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'decimal';
  skin?: 'normal' | 'light';
  disabled?: boolean;
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
  showRules = false,
  marginBottom,
  inputMode = 'text',
  onBlurFunction,
  id = '',
  skin = 'normal',
  disabled = false,
}: InputProps) => {
  const { isMobile } = useScreen();
  const [hide, setHide] = useState<boolean>(type === 'password');
  const [showPasswordRules, setShowPasswordRules] = useState<boolean>(false);

  const togglePassword = (): void => {
    setHide(prevState => !prevState);
  };

  const unhideRules = (): void => {
    if (showRules) {
      setShowPasswordRules(true);
    }
  };

  const hideRules = (): void => {
    if (showRules) {
      setShowPasswordRules(false);
    }
  };

  const styles = skin == 'normal' ? stylesNormal : stylesLight;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: marginBottom || '15px',
      }}
    >
      <div
        className={styles.wrapper}
        style={{
          width: isMobile ? '100%' : width,
        }}
      >
        <input
          id={id}
          type={hide ? 'password' : 'text'}
          name={name}
          inputMode={inputMode}
          value={value}
          placeholder={placeholder}
          onChange={onChangeFunction}
          onBlurCapture={onBlurFunction}
          maxLength={maxLength}
          className={styles.container}
          style={{ width: isMobile ? '100%' : width }}
          onFocus={unhideRules}
          onBlur={() =>
            StrUtils.hasEightChars(value) && StrUtils.hasUppercase(value)
              ? hideRules()
              : unhideRules()
          }
          disabled={disabled}
        />
        {type === 'password' && (
          <div className={styles.password} onClick={togglePassword}>
            {hide ? <IoEye /> : <IoEyeOff />}
          </div>
        )}
      </div>
      {error && <span className={styles.errorText}>* {error}</span>}
      {showRules && showPasswordRules ? (
        <div className={styles.rulesContainer}>
          <div className={styles.ruleItem}>
            {StrUtils.hasUppercase(value) ? (
              <AiFillCheckCircle
                color="green"
                style={{ width: '20px', height: '20px' }}
              />
            ) : (
              <IoIosCloseCircle
                color="red"
                style={{ width: '20px', height: '20px' }}
              />
            )}
            <span>Uma letra maiúscula</span>
          </div>
          <div className={styles.ruleItem}>
            {StrUtils.hasEightChars(value) ? (
              <AiFillCheckCircle
                color="green"
                style={{ width: '20px', height: '20px' }}
              />
            ) : (
              <IoIosCloseCircle
                color="red"
                style={{ width: '20px', height: '20px' }}
              />
            )}
            <span>Pelo menos oito caracteres</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
