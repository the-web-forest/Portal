import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import pagePaths from '../../infra/core/pagePaths';
import Header from '../../sections/header';
import styles from './styles.module.scss';

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      signOut();
    }
  }, [isAuthenticated, signOut]);

  return (
    <>
      <Header title="Dashboard" />
      <div className={styles.container}>
        <button onClick={e => router.push(pagePaths.nursery.index)}>
          Viveiro
        </button>
        <br />
        <button onClick={e => router.push(pagePaths.payment.index)}>
          Pagar
        </button>
      </div>
    </>
  );
};

export default Dashboard;
