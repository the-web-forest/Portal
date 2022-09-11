import { Router, useRouter } from 'next/router';
import { SetStateAction, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import pagePaths from '../../infra/core/pagePaths';
import Settings from '../../infra/core/settings';
import styles from './styles.module.scss';

interface DesktopSidebarProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (value: SetStateAction<boolean>) => void;
}

const DesktopSidebar = ({ menuIsOpen, setMenuIsOpen }: DesktopSidebarProps) => {
  const router = useRouter();
  const { signOut } = useContext(AuthContext);

  return (
    <>
      <div
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className={menuIsOpen ? styles.blackout : styles.blackoutClosed}
      >
        <div
          onClick={e => e.stopPropagation()}
          className={menuIsOpen ? styles.sideMenu : styles.sideMenuClosed}
        >
          <span
            onClick={() => router.push(pagePaths.nursery.index)}
            className={styles.item}
          >
            Plante uma árvore
          </span>
          <span
            onClick={() => router.push(pagePaths.forest.index)}
            className={styles.item}
          >
            Minhas árvores
          </span>
          <span
            onClick={() => router.push(pagePaths.myAccount)}
            className={styles.item}
          >
            Minha conta
          </span>
          <span onClick={() => signOut()} className={styles.item}>
            Sair da conta
          </span>

          <span className={styles.message}>
            Atualmente estamos na fase beta do projeto. Caso encontre qualquer
            problema, entre em contato pelo e-mail{' '}
            <a
              className={styles.support}
              href={`mailto:${Settings.SUPPORT_EMAIL}?subject=Preciso de Suporte`}
            >
              {Settings.SUPPORT_EMAIL}
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default DesktopSidebar;
