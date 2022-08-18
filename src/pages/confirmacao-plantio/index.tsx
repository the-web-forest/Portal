import { NextPage } from 'next';
import Image from 'next/image';
import { WebForestLogo } from '../../components/WebForestLogo';
import styles from '../../styles/PlantingConfirmation.module.scss';
import { useRouter } from 'next/router';
import pagePaths from '../../infra/core/pagePaths';
import Header from '../../sections/header';

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
          <Header />
        </div>
        <div className={styles.body}>
          <div className={styles.circle}>
            <Image src="/images/check-circle.png" width={48} height={48} />
          </div>
          <div className={styles.text}> {`Pedido: ${id}`}</div>
          <div className={styles.textConfirm}>
            {' '}
            Parabéns as árvores escolhidas foram plantadas com sucesso!{' '}
            <div className={styles.doll}>
              <Image
                src="/images/fundo-novo-plantio.png"
                width={125}
                height={281}
              />
            </div>
            <button onClick={() => changePage()} className={styles.button}>
              Ir para minhas árvores
            </button>
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
