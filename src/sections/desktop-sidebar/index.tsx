import { Router, useRouter } from 'next/router';
import { SetStateAction, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import pagePaths from '../../infra/core/pagePaths';
import Settings from '../../infra/core/settings';
import ANALYTICS_EVENTS from '../../lib/analytics/AnalyticsEvents';
import GoogleAnalytics from '../../lib/analytics/GoogleAnalytics';
import styles from './styles.module.scss';

interface DesktopSidebarProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (value: SetStateAction<boolean>) => void;
}

const DesktopSidebar = ({ menuIsOpen, setMenuIsOpen }: DesktopSidebarProps) => {
  const router = useRouter();
  const { signOut } = useContext(AuthContext);

  const goToNurseryDesktop = () => {
    GoogleAnalytics.sendEvent(
      ANALYTICS_EVENTS.USER_CLICKED_SIDE_MENU_GO_TO_NURSERY_DESKTOP,
    );
    router.push(pagePaths.nursery.index);
  };

  const goToForestDesktop = () => {
    GoogleAnalytics.sendEvent(
      ANALYTICS_EVENTS.USER_CLICKED_SIDE_MENU_GO_TO_FOREST_DESKTOP,
    );
    router.push(pagePaths.forest.index);
  };

  const goToMyAccountDesktop = () => {
    GoogleAnalytics.sendEvent(
      ANALYTICS_EVENTS.USER_CLICKED_SIDE_MENU_GO_TO_MY_ACCOUNT_DESKTOP,
    );
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
