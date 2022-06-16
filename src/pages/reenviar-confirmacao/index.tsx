import { NextPage } from 'next';
import { ResendConfirmationForm } from '../../sections/resend-confirmation/ResendConfirmationForm';
import styles from '../../styles/RecoverPassword.module.scss';

const ResendConfirmationPage: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.background} />
    <div className={styles.form}>
      <ResendConfirmationForm />
    </div>
  </div>
);

export default ResendConfirmationPage;
