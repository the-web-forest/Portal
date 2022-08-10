import { NextPage } from 'next';
import Settings from '../../infra/core/settings';
import { ResendEmailConfirmationSuccess } from '../../sections/register-confirmation/Send';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import styles from '../../styles/Signup.success.module.scss';

const ResendConfirmationSuccessPage: NextPage = () => (
  <div className={styles.container}>
    <SignupHeader />
    <title>{`E-mail enviado - ${Settings.APP_NAME}`}</title>
    <div className={styles.body}>
      <hr className={styles.line} />
      <ResendEmailConfirmationSuccess />
    </div>
  </div>
);

export default ResendConfirmationSuccessPage;
