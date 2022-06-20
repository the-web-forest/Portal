import { GetServerSidePropsContext, NextPage } from 'next';
import { Footer } from '../../components/Footer';
import StateEntity from '../../infra/entities/StateEntity';
import GetStatesUseCase from '../../infra/useCases/getStates.usecase';
import { useScreen } from '../../providers/screen';
import { SignupForm } from '../../sections/signup/SignupForm';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import { SignupTitle } from '../../sections/signup/SignupTitle';
import styles from '../../styles/Signup.module.scss';

interface IProps {
  states: StateEntity[];
}

const Signup: NextPage<IProps> = ({ states }: IProps) => {
  const { isMobile } = useScreen();
  return (
    <div className={styles.container}>
      <SignupHeader />
      <div className={isMobile ? styles.mobileBody : styles.body}>
        <SignupTitle />
        <SignupForm states={states} />
        <Footer />
      </div>
    </div>
  );
};

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const response = await new GetStatesUseCase().run();
  return {
    props: {
      states: response.states,
    },
  };
}

export default Signup;
