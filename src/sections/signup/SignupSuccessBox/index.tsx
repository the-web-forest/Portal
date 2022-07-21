import { FC } from 'react';
import styles from './styles.module.scss';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { SignupSuccessicon } from '../../../components/SignupSuccessIcon';

export const SignupSuccessBox: FC = () => (
  <div className={styles.container}>
    <AiOutlineCheckCircle
      color="#63AF53"
      style={{ width: '75px', height: '75px' }}
    />
    <h2 style={{ marginTop: '20px' }}>Cadastro efetuado</h2>
    <h2>confira seu e-mail!</h2>

    <span style={{ marginTop: '20px' }}>Enviamos uma confirmação</span>
    <span>de validação no seu email.</span>
    <div className={styles.iconWrapper}>
      <SignupSuccessicon />
    </div>
  </div>
);
