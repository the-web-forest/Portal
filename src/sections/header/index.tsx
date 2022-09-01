import { WebForestLogo } from '../../components/WebForestLogo';
import styles from './styles.module.scss';
import Image from 'next/image';
import Router from 'next/router';
import pagePaths from '../../infra/core/pagePaths';
import Vibrate from '../../utils/vibrate';
import { useCart } from '../../providers/cart';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Settings from '../../infra/core/settings';

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const cart = useCart();
  const { signOut } = useContext(AuthContext);

  const goToShoppingCart = () => {
    Router.push(pagePaths.payment.shoppingCart);
  };

  const goToDashboard = () => {
    Vibrate.vibrate(200);
    Router.push(pagePaths.nursery.index);
  };

  const goToMyAccount = () => {
    Vibrate.vibrate(200);
    Router.push(pagePaths.myAccount);
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
          {' '}
          <div
            id="logo"
            className={styles.logo}
            onClick={goToDashboard}
            title={'Web Forest'}
          >
            <WebForestLogo />
          </div>
          <div id="right-section" className={styles.rightSection}>
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
            <div
              id="my-account"
              onClick={goToMyAccount}
              className={styles.myAccount}
            >
              <div id="my-photo" className={styles.myPhoto}>
                <Image src={'/images/icons/user.svg'} width={40} height={40} />
              </div>
              <span id="my-account-text" className={styles.myAccountText}>
                Minha Conta
              </span>
            </div>
            <div
              className={styles.logout}
              onClick={() => signOut()}
              title="Sair"
            >
              <Image src={'/icons/exit-icon.svg'} width={40} height={40} />
            </div>
          </div>
        </div>

        <div className={styles.mobile}>
          <div id="my-photo" className={styles.myPhoto}>
            <Image src={'/images/icons/user.svg'} width={40} height={40} />
          </div>
          <div
            id="logo"
            className={styles.logo}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
