import { it } from 'date-fns/locale';
import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai';
import CurrencyHelper from '../../../helpers/currency';
import { sendGoogleEvent } from '../../../lib/GoogleAnalytics';
import { IContextCartItem, useCart } from '../../../providers/cart';
import styles from './styles.module.scss';

interface CartItemProps {
  item: IContextCartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const cart = useCart();

  const removeFromCart = (id: string) => {
    sendGoogleEvent({
      action: 'remove_from_cart',
      category: 'conversion',
      label: 'cart',
      data: { id },
    });
    cart.removeItemOfCart(id);
  };

  const addItemQuantity = (item: IContextCartItem) => {
    sendGoogleEvent({
      action: 'added_item_quantity_cart',
      category: 'conversion',
      label: 'cart',
      data: { ...item },
    });
    cart.addItemToCart(item);
  };

  const removeItemQuantityCart = (id: string) => {
    sendGoogleEvent({
      action: 'removed_item_quantity_cart',
      category: 'conversion',
      label: 'cart',
    });
    cart.removeItemQuantity(id);
  };

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
          <a onClick={() => removeFromCart(item.id)} className={styles.remove}>
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
              onClick={() => removeItemQuantityCart(item.id)}
              className={styles.mobileButton}
            >
              -
            </button>
            <p className={styles.mobileQuantity}>{item.quantity}</p>
            <button
              onClick={() => addItemQuantity(item)}
              className={styles.mobileButton}
            >
              +
            </button>
          </div>
          <div onClick={() => removeFromCart(item.id)}>
            <AiOutlineDelete
              color="#A00E01"
              style={{ width: '25px', height: '25px' }}
            />
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() => removeItemQuantityCart(item.id)}
          className={styles.button}
        >
          -
        </button>
        <p className={styles.quantity}>{item.quantity}</p>
        <button onClick={() => addItemQuantity(item)} className={styles.button}>
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
