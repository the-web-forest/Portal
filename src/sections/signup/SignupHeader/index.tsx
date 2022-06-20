import Link from 'next/link';
import { FC } from 'react';
import { WebForestLogo } from '../../../components/WebForestLogo';
import pagePaths from '../../../infra/core/pagePaths';
import styles from './styles.module.scss';

export const SignupHeader: FC = () => (
  <div className={styles.container}>
    <Link href={pagePaths.index}>
      <div>
        <WebForestLogo />
      </div>
    </Link>
  </div>
);
