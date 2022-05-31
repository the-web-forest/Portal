import { ChangeEventHandler, useState } from 'react';
import styles from './styles.module.scss';
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
  maxLength?: number;
  error?: string;
  width?: string;
  showRules?: boolean;
  marginBottom?: string;
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
  }

  const hideRules = (): void => {
    if (showRules) {
      setShowPasswordRules(false);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: marginBottom ? marginBottom : isMobile ? '30px' : '15px',
      }}
    >
      <div
        className={styles.wrapper}
        style={{
          width: isMobile ? '100%' : width,
        }}
      >
        <input
          id={styles.container}
          type={hide ? 'password' : 'text'}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChangeFunction}
          maxLength={maxLength}
          className={styles.container}
          style={{ width: isMobile ? '100%' : width }}
          onFocus={unhideRules}
          onBlur={hideRules}
        />
        {type === 'password' && (
          <div className={styles.password} onClick={togglePassword}>
            {hide ? <IoEye /> : <IoEyeOff />}
          </div>
        )}
      </div>
      {error && (
        <span 
          className={styles.errorText}
        >
          * {error}
        </span>
      )}
      {showRules && (
        <div className={styles.rulesContainer} style={{
          opacity: showPasswordRules ? 1 : 0
        }}>
          <div className={styles.ruleItem}>
            {StrUtils.hasUppercase(value) ? <AiFillCheckCircle color="green" style={{ width: "20px", height: "20px" }} /> : <IoIosCloseCircle color="red" style={{ width: "20px", height: "20px" }} />}
            <span>Uma letra maiúscula</span>
          </div>
          <div className={styles.ruleItem}>
            {StrUtils.hasSixChars(value) ? <AiFillCheckCircle color="green" style={{ width: "20px", height: "20px" }} /> : <IoIosCloseCircle color="red" style={{ width: "20px", height: "20px" }} />}
            <span>Pelo menos seis caracteres</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
