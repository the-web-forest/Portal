import { NextPage } from 'next';
import styles from '../../styles/Signup.success.module.scss';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import { RegisterConfirmationExpiredBox } from '../../sections/register-confirmation/Expired';

const EmailConfirmationExpiredPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <div className={styles.body}>
      <hr className={styles.line} />
      <RegisterConfirmationExpiredBox />
    </div>
  </div>
);

export default EmailConfirmationExpiredPage;
