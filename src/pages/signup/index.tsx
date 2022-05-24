import { NextPage } from 'next';
import { Footer } from '../../components/Footer';
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
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
