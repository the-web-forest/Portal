import { NextPage } from 'next';
import Header from '../../sections/header';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useCart } from '../../providers/cart';
import FilledButton, { FilledColor } from '../../components/FilledButton';
import CurrencyHelper from '../../helpers/currency';
import { useRouter } from 'next/router';
import pagePaths from '../../infra/core/pagePaths';

const Carrinho: NextPage = () => {
  const cart = useCart();
  const router = useRouter();
  return (
    <>
      <Header title="carrinho" />
      <div id="container" className={styles.container}>
        <div className={styles.boxCart}>
          <div className={styles.containerTitle}>
            <p className={styles.title}>Meu Carrinho</p>
          </div>
          <section style={{ display: 'flex' }}>
            <div className={styles.items}>
              <div className={styles.headers}>
                <div className={`${styles.headerTree}`}>Árvore escolhida</div>
                <div className={styles.headerButtons}>Quantidade</div>
                <div className={styles.headerPrice}>Valor</div>
              </div>
              {cart.items.map(item => {
                return (
                  <div className={styles.cartItem}>
                    <div className={styles.name}>
                      <Image src={item.photo} width={160} height={90} />
                      <div className={styles.data}>
                        <span className={styles.text}>{item.name}</span>
                        <span
                          onClick={() => cart.removeItemOfCart(item.id)}
                          className={styles.remove}
                        >
                          Remover
                        </span>
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      <button
                        onClick={() => cart.removeItemQuantity(item.id)}
                        className={styles.button}
                      >
                        -
                      </button>
                      <p className={styles.quantity}>
                        {cart.getItemQuantity(item.id)}
                      </p>
                      <button
                        onClick={() => cart.addItemToCart(item)}
                        className={styles.button}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.price}>
                      R$
                      {CurrencyHelper.mascaraMoeda(item.value.toString())}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.containerSummary}>
              <div className={styles.headerTitle}>
                <Image src="/images/icons/summary.svg" width={28} height={28} />
                <span>Resumo</span>
              </div>
              <div className={styles.contentSummary}>
                <div className={styles.quantityRow}>
                  <p>Quantidade Total</p>
                  <span>{cart.cartTotals.quantity}</span>
                </div>
                <div className={styles.valueRow}>
                  <p>Valor Total</p>
                  <span>
                    R$
                    {CurrencyHelper.mascaraMoeda(
                      cart.cartTotals.value.toString(),
                    )}
                  </span>
                </div>
                <FilledButton
                  color={FilledColor.budGreen}
                  width="220px"
                  onClick={() => router.push(pagePaths.payment.index)}
                >
                  Continuar
                </FilledButton>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Carrinho;
