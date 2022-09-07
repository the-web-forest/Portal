import { FC } from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
} from 'react-icons/io5';
import Image from 'next/image';
import styles from './styles.module.scss';

export const Footer: FC = () => {
  return (
    <div id="footer" className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.logoWrapper}>
          <Image src="/images/logo-white.svg" width={100} height={40} />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.links}>
          <a>contato@webforest.eco</a>
        </div>
      </div>
      <div className={styles.social}>
        <span>Siga nossas Redes Sociais</span>
        <div className={styles.items}>
          <IoLogoFacebook color="#FFFFFF" />
          <IoLogoInstagram color="#FFFFFF" />
          <IoLogoLinkedin color="#FFFFFF" />
        </div>
      </div>
    </div>
  );
};
