import { WebForestLogo } from '../../components/WebForestLogo';
import styles from './styles.module.scss';
import Image from 'next/image';
import Router from 'next/router';
import pagePaths from '../../infra/core/pagePaths';
import Vibrate from '../../utils/vibrate';
import Cart from '../../utils/cart-utils';
import { useEffect, useState } from 'react';

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const [cartSize, setCartSize] = useState<number>(0);

  const goToShoppingCart = () => {
    Router.push(pagePaths.payment.shoppingCart);
  };

  const goToDashboard = () => {
    Vibrate.vibrate(200);
    Router.push(pagePaths.dashboard);
  };

  const goToMyAccount = () => {
    Vibrate.vibrate(200);
    Router.push(pagePaths.myAccount);
  };

  const renderTitle = () => {
    let headerTitle = 'Web Forest';

    if (title) {
      headerTitle = `${title} - ${headerTitle}`;
    }

    return headerTitle;
  };

  useEffect(() => {
    const cart = new Cart();
    setCartSize(cart.getItemsSize());
  }, []);

  return (
    <header>
      <title>{renderTitle()}</title>
      <div className={styles.container}>
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
              src="/images/icons/shopping-cart.svg"
            />
            <div id="cart-number" className={styles.cartNumber}>
              {cartSize}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
