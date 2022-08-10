import { NextPage } from 'next';
import { ResendConfirmationSuccess } from '../../sections/resend-confirmation/ResendConfirmationSuccess';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import styles from '../../styles/Signup.success.module.scss';

const ResendConfirmationSuccessPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <div className={styles.body}>
      <hr className={styles.line} />
      <ResendConfirmationSuccess />
    </div>
  </div>
);

export default ResendConfirmationSuccessPage;
