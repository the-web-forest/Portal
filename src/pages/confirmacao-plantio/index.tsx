import { NextPage } from 'next';
import Image from 'next/image';
import styles from '../../styles/PlantingConfirmation.module.scss';
import { useRouter } from 'next/router';
import pagePaths from '../../infra/core/pagePaths';
import { SignupHeader } from '../../sections/signup/SignupHeader';

const PlantingConfirmation: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
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
            {`Pedido: ${id ? id : '630404149e66c190eb6214ec'}`}
          </div>
          <div className={styles.textConfirm}>
            {' '}
            Parabéns as árvores escolhidas foram plantadas com sucesso!{' '}
            <button onClick={() => changePage()} className={styles.button}>
              Ir para minhas árvores
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlantingConfirmation;
