import { SetStateAction, useContext } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import pagePaths from '../../infra/core/pagePaths';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import Settings from '../../infra/core/settings';

interface MobileSidebarProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (value: SetStateAction<boolean>) => void;
  userPhoto?: string;
  userName?: string;
}

const MobileSidebar = ({
  menuIsOpen,
  setMenuIsOpen,
  userPhoto,
  userName,
}: MobileSidebarProps) => {
  const router = useRouter();
  const { signOut } = useContext(AuthContext);
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <>
      <div className={menuIsOpen ? styles.container : styles.containerIsClosed}>
        <div className={styles.userData}>
          <div className={styles.left}>
            <div className={styles.photo}>
              <Image
                src={userPhoto || '/images/icons/user.svg'}
                width={45}
                height={45}
              />
            </div>

            <div className={styles.data}>
              <div className={styles.name}>{userName}</div>
            </div>
          </div>

          <div
            className={styles.exit}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <Image src={'/icons/x-close-menu.svg'} width={30} height={30} />
          </div>
        </div>
        <div
          className={styles.menuItem}
          onClick={() =>
            router.push(pagePaths.myAccount).then(() => toggleMenu())
          }
        >
          Minha conta
        </div>
        <div
          className={styles.menuItem}
          onClick={() =>
            router.push(pagePaths.nursery.index).then(() => toggleMenu())
          }
        >
          Plante uma árvore
        </div>
        <div
          className={styles.menuItem}
          onClick={() => {
            router.push(pagePaths.forest.index).then(() => toggleMenu());
          }}
        >
          Minhas árvores
        </div>
        <div className={styles.menuItem}>
          <a
            href={`mailto:${Settings.SUPPORT_EMAIL}?subject=Preciso de Suporte`}
          >
            Fale conosco
          </a>
        </div>
        <div className={styles.menuItem} onClick={() => signOut()}>
          Sair da conta
        </div>
        <span className={styles.message}>
          Atualmente estamos na fase beta do projeto. Caso encontre qualquer
          problema, entre em contato pelo “Fale conosco”.
        </span>
      </div>
    </>
  );
};

export default MobileSidebar;
