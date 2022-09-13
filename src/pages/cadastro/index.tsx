import { GetServerSidePropsContext, NextPage } from 'next';
import StateEntity from '../../infra/entities/StateEntity';
import GetStatesUseCase from '../../infra/useCases/getStates.usecase';
import { useScreen } from '../../providers/screen';
import { SignupForm } from '../../sections/signup/SignupForm';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import { SignupTitle } from '../../sections/signup/SignupTitle';
import styles from '../../styles/Signup.module.scss';

const Signup: NextPage = () => {
  const { isMobile } = useScreen();
  return (
    <div className={styles.container}>
      <SignupHeader />
      <div className={isMobile ? styles.mobileBody : styles.body}>
        <SignupTitle />
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
