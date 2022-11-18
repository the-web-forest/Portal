import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';
import CurrencyHelper from '../../../helpers/currency';
import { IContextCartItem, useCart } from '../../../providers/cart';
import styles from './styles.module.scss';

interface CartItemProps {
  item: IContextCartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const cart = useCart();
  return (
    <div className={styles.container}>
      <div className={styles.photoName}>
        <Image
          className={styles.photo}
          src={item.photo}
          width={150}
          height={90}
        />
        <div className={styles.text}>
          <span className={styles.name}>{item.name}</span>
          <a
            onClick={() => cart.removeItemOfCart(item.id)}
            className={styles.remove}
          >
            Remover
          </a>
        </div>
      </div>

      <div className={styles.mobileData}>
        <div className={styles.mobileName}>{item.name}</div>
        <div className={styles.mobileMeta}>
          <div>R$ {CurrencyHelper.mascaraMoeda(item.value.toString())}</div>
          <div className={styles.mobileButtons}>
            <button
              onClick={() => cart.removeItemQuantity(item.id)}
              className={styles.mobileButton}
            >
              -
            </button>
            <p className={styles.mobileQuantity}>{item.quantity}</p>
            <button
              onClick={() => cart.addItemToCart(item)}
              className={styles.mobileButton}
            >
              +
            </button>
          </div>
          <div onClick={() => cart.removeItemOfCart(item.id)}>
            <AiOutlineDelete
              color="#A00E01"
              style={{ width: '25px', height: '25px' }}
            />
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() => cart.removeItemQuantity(item.id)}
          className={styles.button}
        >
          -
        </button>
        <p className={styles.quantity}>{item.quantity}</p>
        <button
          onClick={() => cart.addItemToCart(item)}
          className={styles.button}
        >
          +
        </button>
      </div>

      <div className={styles.value}>
        <span>R$ {CurrencyHelper.mascaraMoeda(item.value.toString())}</span>
      </div>
    </div>
  );
};

export default CartItem;
