import { NextPage } from 'next';
import { SignupForm } from '../sections/signup/form';
import { SignupHeader } from '../sections/signup/header';
import { SignupTitle } from '../sections/signup/title';
import styles from '../styles/Signup.module.scss';

const Signup: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <div className={styles.body}>
      <SignupTitle />
      <SignupForm />
    </div>
  </div>
);

export default Signup;
