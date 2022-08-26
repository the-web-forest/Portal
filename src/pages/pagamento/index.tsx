import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import FilledButton, { FilledColor } from '../../components/FilledButton';
import Input from '../../components/Input';
import { AuthContext } from '../../contexts/AuthContext';
import CurrencyHelper from '../../helpers/currency';
import pagePaths from '../../infra/core/pagePaths';
import Settings from '../../infra/core/settings';
import AppError from '../../infra/errors/AppError';
import ToastCaller from '../../infra/toast/ToastCaller';
import NewPaymentUseCase from '../../infra/useCases/newPayment.usecase';
import creditCardMask from '../../masks/creditCard.mask';
import creditCardExpirationMask from '../../masks/creditCardExpiration.mask';
import creditCardSecurityCode from '../../masks/creditCardSecurityCode.mask';
import userNameMask from '../../masks/userName.mask';
import { useCart } from '../../providers/cart';
import Header from '../../sections/header';
import { CartItem } from '../../utils/cart-utils';
import IPaymentData from '../../validations/DTO/IPaymentData';
import PaymentFormValidate from '../../validations/DTO/PaymentForm.validate';
import styles from './styles.module.scss';

const newPaymentUseCase = new NewPaymentUseCase();

const Payment: NextPage = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const toast = useToast();
  const router = useRouter();
  const cart = useCart();
  const [data, setData] = useState<IPaymentData>({
    name: '',
    cardExpiration: '',
    cardNumber: '',
    cardCvv: '',
  } as IPaymentData);
  const [error, setError] = useState<IPaymentData>({} as IPaymentData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleChangeInput = useCallback(
    (event, mask?) => {
      let { name, value } = event.target;

      if (mask) {
        value = mask(value);
      }
      setData(prevState => ({
        ...prevState,
        [name]: value,
      }));

      if (error[name as keyof IPaymentData]) {
        setError(prevState => ({
          ...prevState,
          [name]: undefined,
        }));
      }
    },
    [error],
  );

  const getCardHash = useCallback(async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const cardYear = data.cardExpiration.split('/')[1];
        const pagSeguroYear = cardYear.length == 2 ? `20${cardYear}` : cardYear;

        // @ts-ignore
        const card = PagSeguro.encryptCard({
          publicKey: Settings.PAGSEGURO_PUBLIC_KEY,
          holder: data.name,
          number: data.cardNumber.split(' ').join(''),
          expMonth: data.cardExpiration.split('/')[0],
          expYear: pagSeguroYear,
          securityCode: data.cardCvv,
        });

        if (!card.encryptedCard) {
          reject(error);
        }
        resolve(card.encryptedCard);
      } catch (error) {
        ToastCaller.Error(toast, 'Erro', 'Erro ao validar o cartão');
        reject(error);
      }
    });
  }, [
    data.cardCvv,
    data.cardExpiration,
    data.cardNumber,
    data.name,
    error,
    toast,
  ]);

  const checkout = useCallback(async () => {
    setError({} as IPaymentData);
    setIsLoading(true);
    const cardToken = await getCardHash().catch(() => setIsLoading(false));

    if (!cardToken) {
      return;
    }

    const items: CartItem[] = cart.items.map(item => {
      return new CartItem(item.id, item.value, item.quantity);
    });

    newPaymentUseCase
      .run(items, cardToken)
      .then(res => {
        cart.clearCart();
        router.push({
          pathname: pagePaths.plant.confirmation,
          query: { id: encodeURI(res) },
        });
      })
      .catch(err => {
        setShowErrorModal(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cart, getCardHash, router]);

  const handleSubmit: FormEventHandler = useCallback(
    async event => {
      try {
        event.preventDefault();
        const errors = await new PaymentFormValidate().validate(data);
        if (Object.keys(errors)?.length > 0) {
          setError(errors);
          return;
        }
        Object.keys(errors)?.length > 0 && setError({} as IPaymentData);
        await checkout();
      } catch (err: any) {
        if (err instanceof AppError) {
          if (err.error.code) {
            ToastCaller.Error(
              toast,
              'Erro',
              err.error.code + ' - ' + err.error.message,
            );
          }
        } else {
          ToastCaller.Error(
            toast,
            'Erro',
            err.message + err.error.code ??
              'Erro imprevisto, contacte o suporte.',
          );
        }
      }
    },
    [checkout, data, toast],
  );

  useEffect(() => {
    if (!isAuthenticated) {
      signOut();
    }
  }, [error, isAuthenticated, signOut]);

  useEffect(() => {
    if (!cart.cartTotals.quantity) {
      router.push(pagePaths.nursery.index);
    }
  }, [cart.cartTotals.quantity, router]);

  return (
    <>
      <Modal
        isOpen={showErrorModal}
        isCentered
        onClose={() => setShowErrorModal(false)}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent className={styles.modal}>
          <ModalHeader className={styles.modalHeader}>
            <Image
              width={50}
              height={50}
              src={'/images/icons/error-icon.svg'}
            />
            <span className={styles.modalHeaderSpan}>Pagamento reprovado</span>
          </ModalHeader>
          <ModalBody className={styles.modalBody}>
            A operadora do seu cartão recusou a transação. Revise as informações
            ou entre em contato com o seu banco.
          </ModalBody>

          <ModalFooter className={styles.modalFooter}>
            <Button
              className={styles.modalButton}
              onClick={() => setShowErrorModal(false)}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Header title="Pagamento" />
      <div id="container" className={styles.container}>
        <div id="data-section" className={styles.dataSection}>
          <div id="card-section" className={styles.cardSection}>
            <div id="form-section" className={styles.formSection}>
              <form className={styles.cardForm} onSubmit={handleSubmit}>
                <p className={styles.title}>Dados do Cartão</p>
                <div className={styles.inputLine}>
                  <span className={styles.inputText}>Nome</span>
                  <Input
                    name="name"
                    value={data.name}
                    onChangeFunction={e => handleChangeInput(e, userNameMask)}
                    maxLength={50}
                    error={error.name}
                    skin="light"
                    placeholder="Escreva conforme o cartão"
                    disabled={isLoading}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span className={styles.inputText}>Número do Cartão</span>
                  <Input
                    name="cardNumber"
                    inputMode="numeric"
                    value={data.cardNumber}
                    onChangeFunction={e => handleChangeInput(e, creditCardMask)}
                    maxLength={19}
                    error={error.cardNumber}
                    skin="light"
                    placeholder="Escreva o número do cartão"
                    disabled={isLoading}
                  />
                </div>

                <div className={styles.formLine}>
                  <div className={styles.formColumn}>
                    <span className={styles.inputText}>Vencimento</span>
                    <Input
                      name="cardExpiration"
                      inputMode="numeric"
                      value={data.cardExpiration}
                      error={error.cardExpiration}
                      onChangeFunction={e =>
                        handleChangeInput(e, creditCardExpirationMask)
                      }
                      maxLength={7}
                      skin="light"
                      placeholder="00/00"
                      disabled={isLoading}
                    />
                  </div>
                  <div className={styles.formColumn}>
                    <span className={styles.inputText}>CVV</span>
                    <Input
                      name="cardCvv"
                      value={data.cardCvv}
                      error={error.cardCvv}
                      inputMode="numeric"
                      onChangeFunction={e =>
                        handleChangeInput(e, creditCardSecurityCode)
                      }
                      maxLength={4}
                      skin="light"
                      placeholder="000"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div id="card-image-section" className={styles.cardImageSection}>
              <div className={styles.cardIcon}>
                <Image
                  src={'/images/credit-card.svg'}
                  width={300}
                  height={300}
                />
              </div>
              <p className={styles.totalTitle}>Valor Total</p>
              <p className={styles.totalValue}>
                R$
                {CurrencyHelper.mascaraMoeda(cart.cartTotals.value.toString())}
              </p>
              <div className={styles.paymentButton}>
                <FilledButton
                  color={FilledColor.budGreen}
                  onClick={handleSubmit}
                  type="submit"
                  width="100%"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processando' : 'Pagar'}
                </FilledButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
