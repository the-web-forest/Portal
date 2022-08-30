import router, { useRouter } from 'next/router';
import { FC } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import pagePaths from '../../../infra/core/pagePaths';
import styles from './styles.module.scss';

interface PlantSuccessProps {
  plantId: string;
}

export const PlantSuccess = ({ plantId }: PlantSuccessProps) => {

  const router = useRouter();
  const changePage = () => {
    return router.push(pagePaths.forest.index);
  };

  return (
    <div className={styles.container}>
      <AiOutlineCheckCircle
        color="#63AF53"
        style={{ width: '75px', height: '75px' }}
      />
      <h2 style={{ marginTop: '20px' }}>Pedido {plantId}</h2>

      <span>
        Parabéns as árvores escolhidas <br /> foram plantadas com sucesso!
      </span>
      <div className={styles.buttonDiv}>
        <FilledButton color={FilledColor.budGreen} onClick={() => changePage()}>
          Ir para minhas árvores
        </FilledButton>
      </div>
    </div>
  );
};
