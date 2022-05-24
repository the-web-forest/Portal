import type { NextPage } from 'next';
import { LoginForm } from '../sections/signin/LoginForm';
import styles from '../styles/Signin.module.scss';

const Signin: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.loginForm}>
      <LoginForm />
    </div>
    <div className={styles.background} />
  </div>
);

export default Signin;
