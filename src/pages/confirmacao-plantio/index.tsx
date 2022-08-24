import { NextPage } from 'next';
import Image from 'next/image';
import { Footer } from '../../components/Footer';
import { WebForestLogo } from '../../components/WebForestLogo';
import { SignupHeader } from '../../sections/signup/SignupHeader';
import styles from '../../styles/PlantingConfirmation.module.scss';
import { useRouter } from 'next/router';
import pagePaths from '../../infra/core/pagePaths';

const PlantingConfirmation: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  console.log(id, 'id');
  const changePage = () => {
    return router.push(pagePaths.dashboard);
  };
  return (
    <>
      <div className={styles.container}>
        <div>
          <SignupHeader />
        </div>
        <div className={styles.body}>
          <div className={styles.circle}>
            <Image src="/images/check-circle.png" width={48} height={48} />
          </div>
          <div className={styles.text}>
            {' '}
            {`Pedido: ${
              id ? id : '630404149e66c190eb6214ec630404149e66c190eb6214ec'
            }`}
          </div>
          <div className={styles.textConfirm}>
            {' '}
            Parabéns as árvores escolhidas foram plantadas com sucesso!{' '}
            <div className={styles.doll}>
              <Image src="/images/doll.png" width={137} height={167} />
            </div>
            <button onClick={() => changePage()} className={styles.button}>
              Ir para minha floresta
            </button>
          </div>
        </div>
        <div className={styles.sheets}>
          <Image src="/images/folhas.png" width={'450vw'} height={'250vh'} />
        </div>
      </div>
    </>
  );
};

export default PlantingConfirmation;
