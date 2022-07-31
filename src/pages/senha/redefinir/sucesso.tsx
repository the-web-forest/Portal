import { NextPage } from 'next';
import { NewPasswordSuccessBox } from '../../../sections/new-password/NewPasswordSuccess';
import { RecoverPasswordSuccess } from '../../../sections/recover-password/RecoverPasswordSuccess';
import { SignupHeader } from '../../../sections/signup/SignupHeader';
import styles from '../../../styles/Signup.success.module.scss';

const NewPasswordSuccessPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <div className={styles.body}>
      <hr className={styles.line} />
      <NewPasswordSuccessBox />
    </div>
  </div>
);

export default NewPasswordSuccessPage;
