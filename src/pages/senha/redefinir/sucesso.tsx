import { NextPage } from 'next';
import { RecoverPasswordSuccessBox } from '../../../sections/new-password/RecoverPasswordSuccess';
import { RecoverPasswordSuccess } from '../../../sections/resend-password/ResendPasswordSuccess';
import { SignupHeader } from '../../../sections/signup/SignupHeader';
import styles from '../../../styles/Signup.success.module.scss';

const NewPasswordSuccessPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <div className={styles.body}>
      <hr className={styles.line} />
      <RecoverPasswordSuccessBox />
    </div>
  </div>
);

export default NewPasswordSuccessPage;
