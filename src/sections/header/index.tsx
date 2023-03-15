import { WebForestLogo } from '../../components/WebForestLogo';
import styles from './styles.module.scss';
import Image from 'next/image';
import Router from 'next/router';
import pagePaths from '../../infra/core/pagePaths';
import Vibrate from '../../utils/vibrate';
import { useCart } from '../../providers/cart';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Settings from '../../infra/core/settings';
import DesktopSidebar from '../desktop-sidebar';
import MobileSidebar from '../mobile-sidebar';
import ANALYTICS_EVENTS from '../../lib/analytics/AnalyticsEvents';
import GoogleAnalytics from '../../lib/analytics/GoogleAnalytics';

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const cart = useCart();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const goToShoppingCart = () => {
    GoogleAnalytics.sendEvent(
      ANALYTICS_EVENTS.USER_CLICKED_GO_TO_CART_IN_HEADER,
    );
    Router.push(pagePaths.payment.shoppingCart);
  };

  const goToDashboard = () => {
    GoogleAnalytics.sendEvent(ANALYTICS_EVENTS.USER_CLICKED_ON_LOGO);
    Vibrate.vibrate(200);
    Router.push(pagePaths.nursery.index);
  };

  const openMenuMobile = () => {
    GoogleAnalytics.sendEvent(ANALYTICS_EVENTS.USER_OPENED_MOBILE_MENU);
    setMenuIsOpen(!menuIsOpen);
  };

  const toggleMenuDesktop = () => {
    GoogleAnalytics.sendEvent(ANALYTICS_EVENTS.USER_TOGGLED_MENU_DESKTOP, {
      menuIsOpen,
    });
    setMenuIsOpen(!menuIsOpen);
  };

  const renderTitle = () => {
    let headerTitle = Settings.APP_NAME;

    if (title) {
      headerTitle = `${headerTitle} - ${title}`;
    }

    return headerTitle;
  };

  return (
    <header>
      <title>{renderTitle()}</title>
      <div className={styles.container}>
        <div className={styles.desktop}>
          <div
            id="logo"
            className={styles.logo}
            onClick={goToDashboard}
            title={'Web Forest'}
          >
            <WebForestLogo />
          </div>
          <div className={styles.otherSide}>
            <div className={styles.icon}>
              <div
                id="cart-icon"
                className={styles.shoppingCart}
                onClick={goToShoppingCart}
              >
                <Image
                  width={30}
                  height={30}
                  src="/icons/shopping-cart-white.svg"
                />
                <div id="cart-number" className={styles.cartNumber}>
                  {cart.cartTotals.quantity}
                </div>
              </div>
            </div>
            <div id="right-section" className={styles.rightSection}>
              <div
                id="my-account"
                onClick={() => toggleMenuDesktop()}
                className={styles.myAccount}
              >
                <div
                  id="my-photo"
                  className={styles.myPhoto}
                  title="Foto do usuário"
                >
                  <Image
                    src={user?.photo || '/images/icons/user.svg'}
                    width={40}
                    height={40}
                  />
                </div>
                <span id="my-account-text" className={styles.myAccountText}>
                  {user?.name.split(' ')[0]}
                </span>
              </div>
              <div
                id="menu"
                className={styles.menu}
                onClick={() => toggleMenuDesktop()}
              >
                <Image
                  src={'/icons/sandwich-menu.svg'}
                  width={35}
                  height={35}
                />
              </div>
            </div>
          </div>
          <DesktopSidebar
            setMenuIsOpen={setMenuIsOpen}
            menuIsOpen={menuIsOpen}
          />
        </div>

        <div className={styles.mobile}>
          <div
            id="my-photo"
            onClick={() => openMenuMobile()}
            className={styles.myPhoto}
          >
            <Image
              src={'/icons/mobile-sandwich-menu.svg'}
              width={40}
              height={40}
            />
          </div>
          <div
            className={styles.logoMobile}
            onClick={goToDashboard}
            title={'Web Forest'}
          >
            <WebForestLogo />
          </div>
          <div
            id="cart-icon"
            className={styles.shoppingCart}
            onClick={goToShoppingCart}
          >
            <Image
              width={30}
              height={30}
              src="/icons/shopping-cart-white.svg"
            />
            <div id="cart-number" className={styles.cartNumber}>
              {cart.cartTotals.quantity}
            </div>
          </div>
          <MobileSidebar
            setMenuIsOpen={setMenuIsOpen}
            menuIsOpen={menuIsOpen}
            userPhoto={user?.photo}
            userName={user?.name.split(' ')[0]}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
