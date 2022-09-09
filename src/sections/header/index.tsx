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

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  const cart = useCart();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const { signOut, user } = useContext(AuthContext);

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
                onClick={() => setMenuIsOpen(!menuIsOpen)}
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
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                <Image
                  src={'/icons/sandwich-menu.svg'}
                  width={35}
                  height={35}
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className={menuIsOpen ? styles.blackout : styles.blackoutClosed}
          >
            <div
              onClick={e => e.stopPropagation()}
              className={menuIsOpen ? styles.sideMenu : styles.sideMenuClosed}
            >
              <span
                onClick={() => Router.push(pagePaths.nursery.index)}
                className={styles.item}
              >
                Plante uma árvore
              </span>
              <span
                onClick={() => Router.push(pagePaths.forest.index)}
                className={styles.item}
              >
                Minhas árvores
              </span>
              <span
                onClick={() => Router.push(pagePaths.myAccount)}
                className={styles.item}
              >
                Minha conta
              </span>
              <span onClick={() => signOut()} className={styles.item}>
                Sair da conta
              </span>

              <span className={styles.message}>
                Atualmente estamos na fase beta do projeto. Caso encontre
                qualquer problema, entre em contato pelo e-mail{' '}
                <a
                  className={styles.support}
                  href={`mailto:${Settings.SUPPORT_EMAIL}?subject=Preciso de Suporte`}
                >
                  {Settings.SUPPORT_EMAIL}
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.mobile}>
          <div id="my-photo" className={styles.myPhoto}>
            <Image
              src={user?.photo || '/images/icons/user.svg'}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
