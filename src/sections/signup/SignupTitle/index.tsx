import { FC } from 'react';
import styles from './styles.module.scss';

export const SignupTitle: FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Cadastre-se</h1>
    <span className={styles.description}>
      Através do cadastro você apóis nossa causa e planta mais árvores.
    </span>
  </div>
);
