import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../../sections/header';
import NurseryMenu from '../../sections/nursery/menu';
import styles from './styles.module.scss';
const Viveiro: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      signOut();
    }
  }, [isAuthenticated, signOut]);

  return (
    <>
      <Header title="Viveiro" />
      <div id="container" className={styles.container}>
        <p className={styles.title}>
          Escolha abaixo uma Árvore e comece <br /> a revolução ambiental
        </p>

        <NurseryMenu />
      </div>
    </>
  );
};

export default Viveiro;
