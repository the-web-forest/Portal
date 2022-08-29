import { NextPage } from 'next';
import Header from '../../sections/header';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useCart } from '../../providers/cart';
import FilledButton, { FilledColor } from '../../components/FilledButton';

const carrinho: NextPage = () => {
  const data = useCart();
  console.log(data);
  return (
    <>
      <Header title="carrinho" />
      <div id="container" className={styles.container}>
        <div className={styles.boxCart}>
          <div className={styles.containerTitle}>
            <p className={styles.title}>Meu Carrinho</p>
          </div>
          <section style={{display: "flex"}}>
          <div className={styles.items}></div>
          <div className={styles.containerSummary}>
            <div className={styles.headerTitle}>
              <Image src="/images/icons/summary.svg" width={28} height={28} />
              <span>Resumo</span>
            </div>
            <div className={styles.contentSummary}>
              <div className={styles.quantityRow}>
                <p>Quantidade Total</p>
                <span>03</span>
              </div>
              <div className={styles.valueRow}>
                <p>Valor Total</p>
                <span>R$ 46,00</span>
              </div>
              <FilledButton
                color={FilledColor.budGreen}
                onClick={() => console.log('Plante uma Arvore')}
                width="220px"
                disabled={false}
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

export default carrinho;
