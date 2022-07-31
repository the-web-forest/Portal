import { NextPage } from 'next';
import { NewPasswordExpiredBox } from '../../../sections/new-password/NewPasswordExpired';
import { SignupHeader } from '../../../sections/signup/SignupHeader';
import styles from '../../../styles/Signup.success.module.scss';

const NewPasswordExpiredPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <div className={styles.body}>
      <hr className={styles.line} />
      <NewPasswordExpiredBox />
    </div>
  </div>
);

export default NewPasswordExpiredPage;
