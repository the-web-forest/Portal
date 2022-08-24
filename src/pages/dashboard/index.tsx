import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import pagePaths from '../../infra/core/pagePaths';
import Header from '../../sections/header';
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
      <div>Minhas Árvores</div>
      <button onClick={e => router.push(pagePaths.payment.index)}>Pagar</button>
    </>
  );
};

export default Dashboard;
