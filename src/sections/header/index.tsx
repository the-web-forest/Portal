import { WebForestLogo } from '../../components/WebForestLogo';
import styles from './styles.module.scss';
import Image from 'next/image';
import Router from 'next/router';
import pagePaths from '../../infra/core/pagePaths';

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const goToShoppingCart = () => {
    Router.push(pagePaths.payment.shoppingCart);
  };

  const goToDashboard = () => {
    Router.push(pagePaths.dashboard);
  };

  const renderTitle = () => {
    let headerTitle = 'Web Forest';

    if (title) {
      headerTitle = `${title} - ${headerTitle}`;
    }

    return headerTitle;
  };

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
              42
            </div>
          </div>
          <div id="my-account" className={styles.myAccount}>
            <div id="my-photo" className={styles.myPhoto}>
              <Image src={'/images/icons/user.svg'} width={35} height={35} />
            </div>
            Minha Conta
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
