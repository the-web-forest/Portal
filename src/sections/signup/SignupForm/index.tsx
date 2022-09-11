import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import RegisterUserUseCase from '../../../infra/useCases/registerUser.usecase';
import ISignupData from '../../../validations/DTO/ISignupData';
import SignUpFormValidade from '../../../validations/SignUpForm.validate';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import StateEntity from '../../../infra/entities/StateEntity';
import GetCitiesUseCase from '../../../infra/useCases/getCities.usecase';
import pagePaths from '../../../infra/core/pagePaths';
import VerifyEmailUseCase from '../../../infra/useCases/verifyEmail.usecase';
import Settings from '../../../infra/core/settings';
import { useToast } from '@chakra-ui/react';
import AppError from '../../../infra/errors/AppError';
import ToastCaller from '../../../infra/toast/ToastCaller';
import userNameMask from '../../../masks/userName.mask';
import { StrUtils } from '../../../utils/str-utils';
import Select, { ISelectOptionsEntity, OnChangeSelect } from '../../../components/Select';

interface Props {
  states: StateEntity[];
}

export const SignupForm: FC<Props> = ({ states }: Props) => {
  const [formData, setFormData] = useState<ISignupData>({} as ISignupData);
  const [formErrors, setFormErrors] = useState<ISignupData>({} as ISignupData);
  const [statesOption, setStatesOption] = useState<ISelectOptionsEntity[]>([]);
  const [citiesOption, setCitiesOption] = useState<ISelectOptionsEntity[]>([]);
  const [awaitAsync, setAwaitAsync] = useState<boolean | undefined>(false);
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
            err.message ?? 'Erro imprevisto, contacte o suporte.',
          );
          console.error(err);
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

  const handleCities = useCallback(async (state: string) => {
    try {
      const response = await new GetCitiesUseCase().run(state);
      const parsedCitiesOption: ISelectOptionsEntity[] = response.cities.map(
        city => ({ label: city, value: city }),
      );
      setCitiesOption(parsedCitiesOption);
    } catch (err) {
      console.log(err);
    }
  }, []);

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

  useEffect(() => {
    try {
      const newOption: ISelectOptionsEntity[] = states.map(state => ({
        label: state.name,
        value: state.initial,
      }));
      setStatesOption(newOption);
    } catch (err) {
      console.log(err);
    }
  }, [states]);

  useEffect(() => {
    if (formData.state) {
      handleCities(formData.state);
      setFormData(prevState => ({
        ...prevState,
        ['city']: '',
      }));
    }
  }, [formData.state, handleCities]);

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

        <Select
          name="state"
          placeHolder="Estado"
          options={statesOption}
          value={formData.state}
          error={formErrors.state}
          onChange={handleSelectChange}
          width="259px" />

        <Select
          name="city"
          placeHolder="Cidade"
          options={citiesOption}
          value={formData.city}
          error={formErrors.city}
          onChange={handleSelectChange}
          width="259px" />

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
