import { NextPage } from 'next';
import { RecoverPasswordExpiredBox } from '../../../sections/new-password/RecoverPasswordExpired';
import { SignupHeader } from '../../../sections/signup/SignupHeader';
import styles from '../../../styles/Signup.success.module.scss';

const NewPasswordExpiredPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <div className={styles.body}>
      <hr className={styles.line} />
      <RecoverPasswordExpiredBox />
    </div>
  </div>
);

export default NewPasswordExpiredPage;
