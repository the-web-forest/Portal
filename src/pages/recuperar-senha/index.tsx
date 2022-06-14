import { NextPage } from "next";
import { RecoverPasswordForm } from "../../sections/recover-password/RecoverPasswordForm";
import styles from '../../styles/RecoverPassword.module.scss';

const RecoverPassword: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.background} />
    <div className={styles.form}>
      <RecoverPasswordForm />
    </div>
  </div>
)

export default RecoverPassword;