import { FC } from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
} from 'react-icons/io5';
import { useScreen } from '../../providers/screen';
import { WebForestLogo } from '../WebForestLogo';
import styles from './styles.module.scss';

export const Footer: FC = () => {
  const { isMobile } = useScreen();
  return (
    <div
      id="footer"
      className={styles.container}
      style={{
        padding: isMobile ? '30px 30px' : '40px 120px',
      }}
    >
      <div
        className={styles.main}
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: isMobile ? '100%' : 'auto',
          alignItems: isMobile ? 'flex-start' : 'center',
        }}
      >
        <div
          style={{
            height: isMobile ? '60px' : '100px',
            width: isMobile ? '160px' : '250px',
          }}
        >
          <WebForestLogo />
        </div>
        <div
          className={styles.links}
          style={{
            marginLeft: isMobile ? '0px' : '100px',
            marginTop: isMobile ? '20px' : '0px',
            marginBottom: isMobile ? '20px' : '0px',
          }}
        >
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
