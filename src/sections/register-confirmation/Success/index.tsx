import { FC } from 'react';
import styles from './styles.module.scss';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Link from 'next/link';
import pagePaths from '../../../infra/core/pagePaths';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import { SignupSuccessicon } from '../../../components/SignupSuccessIcon';

export const RegisterConfirmationSuccessBox: FC = () => (
  <div className={styles.container}>
    <AiOutlineCheckCircle
      color="#63AF53"
      style={{ width: '75px', height: '75px' }}
    />
    <h2 style={{ marginTop: '20px' }}>Sucesso!</h2>

    <span style={{ marginTop: '20px' }}>Seu e-mail foi validado</span>
    <div style={{ marginTop: '20px' }}>
      <Link href={pagePaths.index}>
        <FilledButton color={FilledColor.budGreen} width="175px">
          Efetuar login
        </FilledButton>
      </Link>
    </div>
    <div className={styles.iconWrapper}>
      <SignupSuccessicon />
    </div>
  </div>
);
