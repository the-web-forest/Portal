import { ITreeResponse } from '../../../infra/dtos/Trees/ITreesResponse.dto';
import styles from './styles.module.scss';
import Image from 'next/image';
import CurrencyHelper from '../../../helpers/currency';
import { ICartItem, useCart } from '../../../providers/cart';

interface NurseryGalleryItemProps {
  data: ITreeResponse;
  showTreeModal: (tree: ITreeResponse) => void;
}

const NurseryGalleryItem = ({
  data,
  showTreeModal,
}: NurseryGalleryItemProps) => {
  const cart = useCart();

  const addItem = () => {
    const item: ICartItem = {
      id: data.id,
      value: data.value,
      name: data.name,
    };
    cart.addItemToCart(item);
  };

  const removeItem = () => {
    cart.removeItemQuantity(data.id);
  };

  const getItemQuantity = () => {
    return cart.getItemQuantity(data.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Image
          src={data.image}
          width={100}
          height={50}
          layout="responsive"
          className={styles.photo}
        />
        <p className={styles.name}>{data.name}</p>
        <div className={styles.line}>
          <p className={styles.value}>
            R$ {CurrencyHelper.mascaraMoeda(data.value.toString())}
          </p>
          <div className={styles.buttons}>
            <button onClick={removeItem} className={styles.button}>
              -
            </button>
            <p className={styles.quantity}>{getItemQuantity()}</p>
            <button onClick={addItem} className={styles.button}>
              +
            </button>
          </div>
        </div>
        <a onClick={() => showTreeModal(data)} className={styles.details}>
          Detalhes
        </a>
      </div>
    </div>
  );
};

export default NurseryGalleryItem;
