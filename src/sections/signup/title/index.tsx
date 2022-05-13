import { FC } from 'react';
import { useScreen } from '../../../providers/screen';
import styles from './styles.module.scss';

export const SignupTitle: FC = () => {
  const { isMobile } = useScreen();

  return (
    <div
      className={styles.container}
      style={{
        padding: isMobile ? '30px 30px 0px 30px' : '40px 120px 0px 120px',
        paddingBottom: 'unset',
      }}
    >
      <h1 className={styles.title}>Cadastre-se</h1>
      <span className={styles.description}>
        Através do cadastro você apoia nossa causa e planta mais arvores
      </span>
    </div>
  );
};
