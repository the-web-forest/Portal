import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import {
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import AttentionMessage from '../../components/AttentionMessage';
import FilledButton, { FilledColor } from '../../components/FilledButton';
import Input from '../../components/Input';
import { AuthContext } from '../../contexts/AuthContext';
import pagePaths from '../../infra/core/pagePaths';
import Settings from '../../infra/core/settings';
import AppError from '../../infra/errors/AppError';
import ErrorCode from '../../infra/errors/ErrorCodes';
import ToastCaller from '../../infra/toast/ToastCaller';
import NewPaymentUseCase from '../../infra/useCases/newPayment.usecase';
import creditCardMask from '../../masks/creditCard.mask';
import creditCardExpirationMask from '../../masks/creditCardExpiration.mask';
import creditCardSecurityCode from '../../masks/creditCardSecurityCode.mask';
import userNameMask from '../../masks/userName.mask';
import Header from '../../sections/header';
import Cart from '../../utils/cart-utils';
import IPaymentData from '../../validations/DTO/IPaymentData';
import PaymentFormValidate from '../../validations/DTO/PaymentForm.validate';
import styles from './styles.module.scss';

const newPaymentUseCase = new NewPaymentUseCase();

const Payment: NextPage = () => {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const toast = useToast();
  const router = useRouter();

  const [data, setData] = useState<IPaymentData>({} as IPaymentData);
  const [error, setError] = useState<IPaymentData>({} as IPaymentData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalValue, setTotalValue] = useState<string>('0.00');
  const [totalItems, setTotalItems] = useState<number>(0);
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
    const checkoutCart = new Cart();
    const cardToken = await getCardHash().catch(() => setIsLoading(false));

    if (!cardToken) {
      return;
    }

    newPaymentUseCase
      .run(checkoutCart.getItems(), cardToken)
      .then(res => {
        //  new Cart().deleteAllItems();
        router.push(pagePaths.plant.confirmation);
      })
      .catch(err => {
        setShowErrorModal(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getCardHash, router]);

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
          switch (err.error.code) {
            case ErrorCode.unverifiedEmail:
              router.push(pagePaths.resendEmail.index);
              break;
            case ErrorCode.invalidUserNameOrPassword:
              break;
            default:
              ToastCaller.Error(
                toast,
                'Erro',
                err.error.code + ' - ' + err.error.message,
              );
              break;
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
    [checkout, data, router, toast],
  );

  useEffect(() => {
    if (!isAuthenticated) {
      signOut();
    }
  }, [error, isAuthenticated, signOut]);

  useEffect(() => {
    const cart = new Cart();
    setTotalValue(cart.getCartTotalValue().toFixed(2));
    setTotalItems(cart.getItemsSize());
  }, [isAuthenticated, signOut]);

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
          <div id="title" className={styles.title}>
            Pagamento
          </div>
          <div id="payment-type" className={styles.paymentType}>
            Cartão de Crédito
          </div>

          <div id="card-section" className={styles.cardSection}>
            <div id="form-section" className={styles.formSection}>
              <form className={styles.cardForm} onSubmit={handleSubmit}>
                <span className={styles.inputText}>
                  Nome impresso no cartão
                </span>
                <Input
                  name="name"
                  value={data.name}
                  onChangeFunction={e => handleChangeInput(e, userNameMask)}
                  maxLength={50}
                  error={error.name}
                />

                <span className={styles.inputText}>Número do Cartão</span>
                <Input
                  name="cardNumber"
                  inputMode="numeric"
                  value={data.cardNumber}
                  onChangeFunction={e => handleChangeInput(e, creditCardMask)}
                  maxLength={19}
                  error={error.cardNumber}
                />

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

              <div className={styles.desktopPaymentButton}>
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
        <div id="summary-section" className={styles.summarySection}>
          <div id="summary-box" className={styles.summaryBox}>
            <div id="summary-box-title" className={styles.summaryBoxTitle}>
              Resumo
            </div>

            <div id="summary-header" className={styles.summaryHeader}>
              <span>Quantidade</span>
              <span>Valor</span>
            </div>
            <div className={styles.divider}></div>

            <div id="summary-items" className={styles.summaryItems}>
              <span>{totalItems} Árvores</span>
              <span>R$ {totalValue}</span>
            </div>
          </div>

          <div className={styles.mobilePaymentButton}>
            {Object.keys(error).length > 0 && (
              <div className={styles.errorMessage}>
                <AttentionMessage message="Verifique todos os campos!" />
              </div>
            )}
            <FilledButton
              color={FilledColor.budGreen}
              width="100%"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Processando' : 'Pagar'}
            </FilledButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
