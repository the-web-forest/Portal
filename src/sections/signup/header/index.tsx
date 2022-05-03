import { FC } from 'react';
import { WebForestLogo } from '../../../components/WebForestLogo';
import styles from './styles.module.scss';

export const SignupHeader: FC = () => (
  <div className={styles.container}>
    <div>
      <WebForestLogo />
    </div>
  </div>
);
