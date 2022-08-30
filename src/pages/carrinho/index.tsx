import { NextPage } from 'next';
import Header from '../../sections/header';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useCart } from '../../providers/cart';
import FilledButton, { FilledColor } from '../../components/FilledButton';
import CurrencyHelper from '../../helpers/currency';
import { useRouter } from 'next/router';
import pagePaths from '../../infra/core/pagePaths';
import CartItem from '../../sections/cart/cart-item';
import ToastCaller from '../../infra/toast/ToastCaller';
import { useToast } from '@chakra-ui/react';

const Carrinho: NextPage = () => {
  const cart = useCart();
  const router = useRouter();
  const toast = useToast();

  const goToPayment = async (): Promise<boolean> => {
    if (cart.cartTotals.quantity <= 0) {
      ToastCaller.Warning(toast, 'Atenção', 'Seu carrinho está vazio');
      return false;
    }

    return router.push(pagePaths.payment.index);
  };

  return (
    <>
      <Header title="Carrinho" />
      <div className={styles.container}>
        <div className={styles.title}>Meu carrinho</div>
        <div className={styles.data}>
          <div className={styles.items}>
            <div className={styles.headers}>
              <div className={styles.tree}>
                <span>Árvore escolhida</span>
              </div>
              <div className={styles.buttons}>
                <span>Quantidade</span>
              </div>
              <div className={styles.price}>
                <span>Valor</span>
              </div>
            </div>
            {cart.items.length == 0 && (
              <div className={styles.emptyCart}>
                <span>Seu carrinho está vazio</span>
                <div className={styles.button}>
                  <FilledButton
                    color={FilledColor.budGreen}
                    onClick={() => router.push(pagePaths.nursery.index)}
                    type="submit"
                    width="250px"
                  >
                    Selecionar Árvores
                  </FilledButton>
                </div>
              </div>
            )}

            {cart.items.map(item => (
              <CartItem item={item} />
            ))}

            {cart.cartTotals.quantity >= 1 && (
              <div className={styles.mobileInfo}>
                <span>Total R$</span>
                <span>
                  {CurrencyHelper.mascaraMoeda(
                    cart.cartTotals.value.toString(),
                  )}
                </span>
              </div>
            )}
          </div>
          <div className={styles.summary}>
            <div className={styles.box}>
              <div className={styles.header}>
                <span>Resumo</span>
              </div>
              <div className={styles.boxData}>
                <span>Quantidade Total</span>
                <span className={styles.cartTotals}>
                  {cart.cartTotals.quantity}
                </span>
                <span className={styles.totalValueText}>Valor Total</span>
                <span className={styles.totalValue}>
                  R$
                  {CurrencyHelper.mascaraMoeda(
                    cart.cartTotals.value.toString(),
                  )}
                </span>

                <FilledButton
                  color={FilledColor.budGreen}
                  onClick={() => goToPayment()}
                  type="submit"
                  width="80%"
                  disabled={false}
                >
                  Continuar
                </FilledButton>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerMobile}>
          <div className={styles.buttonMobile}>
            <FilledButton
              color={FilledColor.budGreen}
              onClick={() => goToPayment()}
              type="submit"
              width="100%"
            >
              Continuar para pagamento
            </FilledButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrinho;
