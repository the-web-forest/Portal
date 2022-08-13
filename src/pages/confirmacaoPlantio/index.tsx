import { NextPage } from 'next';
import Image from 'next/image';
import { Footer } from '../../components/Footer';
import { WebForestLogo } from '../../components/WebForestLogo';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import styles from '../../styles/PlantingConfirmation.module.scss';

const PlantingConfirmation: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <SignupHeader />
        <div className={styles.body}>
          <div className={styles.circle}>
            <Image src="/images/check-circle.png" width={48} height={48} />
          </div>
          <div className={styles.text}> Pedido AABBCC2200 </div>
          <div className={styles.textConfirm}>
            {' '}
            Parabéns as árvores escolhidas foram plantadas com sucesso!{' '}
            <div className={styles.doll}>
              <Image src="/images/Group.png" width={125} height={281} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.footer}>
            <div className={styles.logo}>
              <WebForestLogo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlantingConfirmation;
