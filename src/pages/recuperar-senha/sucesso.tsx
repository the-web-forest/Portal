import { NextPage } from 'next';
import { RecoverPasswordSuccess } from '../../sections/recover-password/RecoverPasswordSuccess';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import styles from '../../styles/Signup.success.module.scss';

const RecoverPasswordSuccessPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <div className={styles.body}>
      <hr className={styles.line} />
      <RecoverPasswordSuccess />
    </div>
  </div>
);

export default RecoverPasswordSuccessPage;
