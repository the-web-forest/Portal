import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ComboBox, { OnChangeSelect, ISelectOptionsEntity} from '../../../components/ComboBox';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { useScreen } from '../../../providers/screen';
import RegisterUserUseCase from '../../../infra/useCases/registerUser.usecase';
import ISignupData from '../../../validations/DTO/ISignupData';
import SignUpFormValidade from '../../../validations/SignUpForm.validate';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import IState from '../../../infra/entities/IState'
import GetCitiesUseCase from '../../../infra/useCases/getCities.usecase'

interface Props {
  states: IState[]
}


export const SignupForm: FC<Props> = ({ states }: Props) => {
  const { isMobile } = useScreen();
  const [formData, setFormData] = useState<ISignupData>({} as ISignupData);
  const [formErrors, setFormErrors] = useState<ISignupData>({} as ISignupData);
  const [statesOption, setStatesOption] = useState<ISelectOptionsEntity[]>([])
  const [citiesOption, setCitiesOption] = useState<ISelectOptionsEntity[]>([])
  const router = useRouter();
  const handleSubmit: FormEventHandler = useCallback(
    async event => {
      try {
        event.preventDefault();
        const errors = await new SignUpFormValidade().validate(formData);
        if (Object.keys(errors)?.length > 0) {
          setFormErrors(errors);
        } else {
          Object.keys(formErrors)?.length > 0 &&
            setFormErrors({} as ISignupData);
          const registered = await new RegisterUserUseCase().run(formData);
          registered && router.push('/success');
        }
      } catch (err) {
        console.error(err);
      }
    },
    [formData, formErrors, router],
  );

  const handleSelectChange: OnChangeSelect = useCallback((name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleCities = useCallback(async (state: string) => {
    try {
      const response = await new GetCitiesUseCase().run(state)
      const parsedCitiesOption:ISelectOptionsEntity[] = response.cities.map( city => ({label: city, value: city}))
      setCitiesOption(parsedCitiesOption)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const { name, value } = event.target;
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

  useEffect(() => {
    try {
      const newOption: ISelectOptionsEntity[] = states.map(state => ({label: state.name, value: state.initial}))
      setStatesOption(newOption)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    if(formData.state) {
      handleCities(formData.state)
    }
  }, [formData.state])


  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      style={{
        padding: isMobile ? '0px 30px 30px 30px' : '0px 120px 40px 120px',
        paddingTop: 'unset',
      }}
    >
      <Input
        placeholder="Nome"
        name="name"
        value={formData.name}
        error={formErrors.name}
        onChangeFunction={handleChange}
        width="352px"
      />
      <Input
        placeholder="Email"
        name="email"
        value={formData.email}
        error={formErrors.email}
        onChangeFunction={handleChange}
        width="352px"
      />

      <ComboBox
        name="state"
        placeHolder="Estado"
        options={statesOption}
        value={formData.state}
        error={formErrors.state}
        onChange={handleSelectChange}
        width="259px"
      />

      <ComboBox
        name="city"
        placeHolder="Cidade"
        options={citiesOption}
        value={formData.city}
        error={formErrors.city}
        onChange={handleSelectChange}
        width="259px"
      />

      <span className={styles.passwordTitle}>Informe uma senha</span>

      <Input
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
        placeholder="Repetir senha"
        name="confirm"
        type="password"
        value={formData.confirm}
        error={formErrors.confirm}
        onChangeFunction={handleChange}
        width="259px"
      />

      <FilledButton color={FilledColor.budGreen} width="153px">
        Cadastrar
      </FilledButton>
    </form>
  );
};
