import { NextPage } from 'next';
import Head from 'next/head';
import { RecoverPasswordExpiredBox } from '../../../sections/new-password/RecoverPasswordExpired';
import { SignupHeader } from '../../../sections/signup/SignupHeader';
import styles from '../../../styles/Signup.success.module.scss';

const NewPasswordExpiredPage: NextPage = () => (
  <>
    <Head>
      <title>Link de redefinir senha expirado</title>
    </Head>
    <div className={styles.container}>
      <SignupHeader />
      <div className={styles.body}>
        <hr className={styles.line} />
        <RecoverPasswordExpiredBox />
      </div>
    </div>
  </>
);

export default NewPasswordExpiredPage;
