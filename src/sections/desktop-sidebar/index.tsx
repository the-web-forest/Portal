import { Router, useRouter } from 'next/router';
import { SetStateAction, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import pagePaths from '../../infra/core/pagePaths';
import Settings from '../../infra/core/settings';
import { sendGoogleEvent } from '../../lib/GoogleAnalytics';
import styles from './styles.module.scss';

interface DesktopSidebarProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (value: SetStateAction<boolean>) => void;
}

const DesktopSidebar = ({ menuIsOpen, setMenuIsOpen }: DesktopSidebarProps) => {
  const router = useRouter();
  const { signOut } = useContext(AuthContext);

  const goToNurseryDesktop = () => {
    sendGoogleEvent({
      action: 'side_menu_go_to_nursery_desktop',
      category: 'conversion',
      label: 'menu',
    });
    router.push(pagePaths.nursery.index);
  };

  const goToForestDesktop = () => {
    sendGoogleEvent({
      action: 'side_menu_go_to_forest_desktop',
      category: 'conversion',
      label: 'menu',
    });
    router.push(pagePaths.forest.index);
  };

  const goToMyAccountDesktop = () => {
    sendGoogleEvent({
      action: 'side_menu_go_to_my_account_desktop',
      category: 'conversion',
      label: 'menu',
    });
    router.push(pagePaths.myAccount);
  };

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
          <span onClick={() => goToNurseryDesktop()} className={styles.item}>
            Plante uma árvore
          </span>
          <span onClick={() => goToForestDesktop()} className={styles.item}>
            Minhas árvores
          </span>
          <span onClick={() => goToMyAccountDesktop()} className={styles.item}>
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
