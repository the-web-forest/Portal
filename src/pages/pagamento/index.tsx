import { NextPage } from 'next';
import Image from 'next/image';
import FilledButton, { FilledColor } from '../../components/FilledButton';
import Input from '../../components/Input';
import Header from '../../sections/header';
import styles from './styles.module.scss';

const Payment: NextPage = () => {
  return (
    <>
      <Header title="Pagamento" />
      <div id="container" className={styles.container}>
        <div id="data-section" className={styles.dataSection}>
          <div id="title" className={styles.title}>
            Pagamento
          </div>
          <div id="payment-type" className={styles.paymentType}>
            Cartão de Crédito
          </div>

          <div id="card-section" className={styles.cardSection}>
            <div id="form-section" className={styles.formSection}>
              <form className={styles.cardForm} action="" method="post">
                <span className={styles.inputText}>
                  Nome impresso no cartão
                </span>
                <Input
                  placeholder="Nome"
                  name="credit-card-holder-name"
                  value={''}
                  onChangeFunction={() => console.log('a')}
                />

                <span className={styles.inputText}>Número do Cartão</span>
                <Input
                  placeholder="1111 2222 3333 4444"
                  name="credit-card-number"
                  value={''}
                  onChangeFunction={() => console.log('a')}
                />

                <div className={styles.formLine}>
                  <div className={styles.formColumn}>
                    <span className={styles.inputText}>
                      Vencimento do Cartão
                    </span>
                    <Input
                      placeholder="MM/YYYY"
                      name="credit-card-expiration-date"
                      value={''}
                      onChangeFunction={() => console.log('a')}
                    />
                  </div>
                  <div className={styles.formColumn}>
                    <span className={styles.inputText}>CVV</span>
                    <Input
                      placeholder="123"
                      name="credit-card-security-code"
                      value={''}
                      onChangeFunction={() => console.log('a')}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div id="card-image-section" className={styles.cardImageSection}>
              <div className={styles.cardIcon}>
                <Image
                  src={'/images/icons/credit-card.svg'}
                  width={300}
                  height={300}
                />
              </div>

              <FilledButton
                color={FilledColor.budGreen}
                width="50%"
                onClick={async () => {
                  console.log('click');
                }}
              >
                Pagar
              </FilledButton>
            </div>
          </div>
        </div>
        <div id="summary-section" className={styles.summarySection}>
          RESUMO
        </div>
      </div>
    </>
  );
};

export default Payment;
