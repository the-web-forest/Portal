import { NextPage } from 'next';
import Settings from '../../infra/core/settings';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import { SignupSuccessBox } from '../../sections/signup/SignupSuccessBox';
import styles from '../../styles/Signup.success.module.scss';

const SignupSuccess: NextPage = () => (
  <div className={styles.container}>
    <title>{`Cadastro com Sucesso! - ${Settings.APP_NAME}`}</title>
    <SignupHeader />
    <div className={styles.body}>
      <hr className={styles.line} />
      <SignupSuccessBox />
    </div>
  </div>
);

export default SignupSuccess;
