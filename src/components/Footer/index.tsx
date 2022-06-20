import { FC } from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
} from 'react-icons/io5';
import { WebForestLogo } from '../WebForestLogo';
import styles from './styles.module.scss';

export const Footer: FC = () => {
  return (
    <div id="footer" className={styles.container}>
      <div className={styles.main}>
        <div className={styles.logoWrapper}>
          <WebForestLogo />
        </div>
        <div className={styles.links}>
          <a>Área da transparência</a>
          <a>Política de privacidade</a>
        </div>
      </div>

      <div className={styles.social}>
        <span>Siga nossas Redes Sociais</span>
        <div className={styles.items}>
          <IoLogoFacebook color="#4D4D4D" />
          <IoLogoInstagram color="#4D4D4D" />
          <IoLogoLinkedin color="#4D4D4D" />
        </div>
      </div>
    </div>
  );
};
