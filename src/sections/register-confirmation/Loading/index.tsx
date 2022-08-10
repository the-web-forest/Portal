import { FC } from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { SignupSuccessicon } from '../../../components/SignupSuccessIcon';
import styles from './styles.module.scss';

export const ResendConfirmationLoading: FC = () => {
  return (
    <div className={styles.container}>
      <HiOutlineMailOpen
        color="#63AF53"
        style={{ width: '75px', height: '75px' }}
      />
      <h2 style={{ marginTop: '20px' }}>Aguarde...</h2>

      <span style={{ marginTop: '20px' }}>Estamos validando seu e-mail</span>
      <div className={styles.iconWrapper}>
        <SignupSuccessicon />
      </div>
    </div>
  );
};
