import { FC } from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
} from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import Settings from '../../infra/core/settings';

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
          <a>{Settings.CONTACT_EMAIL}</a>
        </div>
      </div>
      <div className={styles.social}>
        <span>Siga nossas Redes Sociais</span>
        <div className={styles.items}>
          <Link href={Settings.FACEBOOK_URL} passHref>
            <a target="_blank">
              <IoLogoFacebook color="#FFFFFF" />
            </a>
          </Link>
          <Link href={Settings.INSTAGRAM_URL} passHref>
            <a target="_blank">
              <IoLogoInstagram color="#FFFFFF" />
            </a>
          </Link>
          <Link href={Settings.LINKEDIN_URL} passHref>
            <a target="_blank">
              <IoLogoLinkedin color="#FFFFFF" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
