import { NextPage } from 'next';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { PlantSuccess } from '../../sections/plant/success';
import Header from '../../sections/header';

const PlantingConfirmation: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Header title={'Plantio realizado com sucesso'} />
      <div className={styles.container}>
        <div className={styles.body}>
          <PlantSuccess plantId={id} />
        </div>
      </div>
    </>
  );
};

export default PlantingConfirmation;
