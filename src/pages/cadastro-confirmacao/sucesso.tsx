import { NextPage } from 'next';
import styles from '../../styles/Signup.success.module.scss';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import { RegisterConfirmationSuccessBox } from '../../sections/register-confirmation/Success';
import Settings from '../../infra/core/settings';

const EmailConfirmationSuccessPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <title>{`E-mail Validado - ${Settings.APP_NAME}`}</title>
    <div className={styles.body}>
      <hr className={styles.line} />
      <RegisterConfirmationSuccessBox />
    </div>
  </div>
);

export default EmailConfirmationSuccessPage;
