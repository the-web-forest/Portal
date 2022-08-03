import { NextPage } from 'next';
import { NewPasswordForm } from '../../../sections/new-password/NewPasswordForm';
import styles from '../../../styles/NewPassword.module.scss';

const NewPasswordPage: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.form}>
      <NewPasswordForm />
    </div>
    <div className={styles.background} />
  </div>
);

export default NewPasswordPage;
