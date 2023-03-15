import {
  FC,
  FocusEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import RegisterUserUseCase from '../../../infra/useCases/registerUser.usecase';
import ISignupData from '../../../validations/DTO/ISignupData';
import SignUpFormValidade from '../../../validations/SignUpForm.validate';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import pagePaths from '../../../infra/core/pagePaths';
import VerifyEmailUseCase from '../../../infra/useCases/verifyEmail.usecase';
import Settings from '../../../infra/core/settings';
import { Checkbox, useToast } from '@chakra-ui/react';
import AppError from '../../../infra/errors/AppError';
import ToastCaller from '../../../infra/toast/ToastCaller';
import userNameMask from '../../../masks/userName.mask';
import { StrUtils } from '../../../utils/str-utils';
import { OnChangeSelect } from '../../../components/Select';
import Consts from '../../../infra/core/consts';
import { sendGoogleEvent } from '../../../lib/GoogleAnalytics';

export const SignupForm: FC = () => {
  const [formData, setFormData] = useState<ISignupData>({
    terms: false,
  } as ISignupData);
  const [formErrors, setFormErrors] = useState<ISignupData>({} as ISignupData);
  const [awaitAsync, setAwaitAsync] = useState<boolean | undefined>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const [emailInformation, setEmailInformation] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const handleSubmit: FormEventHandler = useCallback(
    async event => {
      try {
        setAwaitAsync(true);
        event.preventDefault();
        const errors = await new SignUpFormValidade().validate(
          formData,
          formErrors,
        );
        if (Object.keys(errors)?.length > 0) {
          setFormErrors(errors);
        } else {
          Object.keys(formErrors)?.length > 0 &&
            setFormErrors({} as ISignupData);
          const registered = await new RegisterUserUseCase().run(formData);

          sendGoogleEvent({
            action: 'user_registered',
            category: 'conversion',
            label: 'menu',
          });

          registered && router.push(pagePaths.signup.success);
        }
      } catch (err: any) {
        if (err instanceof AppError) {
          if (err.error.code != null) {
            ToastCaller.Error(
              toast,
              'Erro',
              err.error.code + ' - ' + err.error.message,
            );
          } else {
            ToastCaller.Error(
              toast,
              'Erro',
              err.error.message ??
                err.message ??
                'Erro imprevisto, contacte o suporte.',
            );
          }
        } else {
          ToastCaller.Error(
            toast,
            'Erro',
            'As informações precisam ser preenchidas.',
          );
        }
      } finally {
        setAwaitAsync(false);
      }
    },
    [formData, formErrors, router, toast],
  );

  const handleSelectChange: OnChangeSelect = useCallback(
    (name, value) => {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));

      if (formErrors[name as keyof ISignupData]) {
        setFormErrors(prevState => ({
          ...prevState,
          [name]: undefined,
        }));
      }
    },
    [formErrors],
  );

  const handleChange = useCallback(
    (event, mask?) => {
      let { name, value } = event.target;

      if (mask) {
        value = mask(value);
      }
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));

      if (formErrors[name as keyof ISignupData]) {
        setFormErrors(prevState => ({
          ...prevState,
          [name]: undefined,
        }));
      }
    },
    [formErrors],
  );

  const handleVerifyEmail: FocusEventHandler<HTMLInputElement> = useCallback(
    async event => {
      const { name, value } = event.target;
      try {
        if (StrUtils.isEmailValid(value)) {
          await new VerifyEmailUseCase().run(value);
          setFormData(prevState => ({
            ...prevState,
            [name]: value,
          }));

          if (formErrors[name as keyof ISignupData]) {
            setFormErrors(prevState => ({
              ...prevState,
              [name]: undefined,
            }));
          }
        } else if (value != '') {
          setFormErrors(prevState => ({
            ...prevState,
            email: 'Email informado é inválido',
          }));
        } else {
          setFormErrors(prevState => ({
            ...prevState,
            email: 'Email é obrigatório',
          }));
        }
      } catch (err: any) {
        if (err instanceof AppError) {
          setFormErrors(prevState => ({
            ...prevState,
            email: err.message,
          }));
        } else {
          setFormErrors(prevState => ({
            ...prevState,
            email: 'Erro imprevisto',
          }));
        }
      }
    },
    [formErrors],
  );

  const handleTerms = useCallback(() => {
    setTerms(!terms);
    setFormData(prevState => ({
      ...prevState,
      terms: !terms,
    }));
  }, [terms]);
  const handleEmailInformation = useCallback(() => {
    setEmailInformation(!emailInformation);
    setFormData(prevState => ({
      ...prevState,
      allowNewsletter: !emailInformation,
    }));
  }, [emailInformation]);
  return (
    <>
      <title>{`Novo Cadastro - ${Settings.APP_NAME}`}</title>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          placeholder="Nome"
          name="name"
          id="name"
          inputMode="text"
          value={formData.name}
          error={formErrors.name}
          onChangeFunction={e => handleChange(e, userNameMask)}
          width="352px"
        />
        <Input
          placeholder="Email"
          name="email"
          id="email"
          inputMode="email"
          value={formData.email}
          error={formErrors.email}
          onChangeFunction={handleChange}
          onBlurFunction={handleVerifyEmail}
          width="352px"
        />

        <span className={styles.passwordTitle}>Informe uma senha</span>

        <Input
          id="password"
          placeholder="Senha"
          name="password"
          type="password"
          value={formData.password}
          error={formErrors.password}
          onChangeFunction={handleChange}
          width="259px"
          showRules
        />

        <Input
          id="new-password"
          placeholder="Repetir senha"
          name="confirm"
          type="password"
          value={formData.confirm}
          error={formErrors.confirm}
          onChangeFunction={handleChange}
          width="259px"
        />
        <div className={styles.inputCheckbox}>
          <label itemID="terms">
            <Checkbox
              iconColor="#65A944"
              colorScheme="write"
              type="checkbox"
              id="checkbox-terms"
              name="terms"
              size="md"
              onChange={handleTerms}
              isChecked={terms}
              className={styles.checked}
            >
              <span>
                Li e concordo com os{' '}
                <a
                  href={Consts.TERMS_URL}
                  target="_blank"
                  className={styles.terms}
                >
                  Termos de Uso e Privacidade
                </a>{' '}
                do site{' '}
              </span>
            </Checkbox>
          </label>
          <label itemID="information">
            <Checkbox
              iconColor="#65A944"
              colorScheme="write"
              size="md"
              type="checkbox"
              id="email-information"
              name="information"
              onChange={handleEmailInformation}
              isChecked={emailInformation}
            >
              <span>
                Desejo receber e-mails promocionais e informativos da Web Forest
              </span>
            </Checkbox>
          </label>
          {!terms &&
            !awaitAsync &&
            formErrors.terms &&
            ToastCaller.Error(toast, 'Erro', 'Os termos são Obrigatórios.')}
        </div>
        <FilledButton
          disabled={awaitAsync}
          type="submit"
          color={FilledColor.budGreen}
          width="153px"
        >
          Cadastrar
        </FilledButton>
      </form>
    </>
  );
};
