import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import ComboBox, { OnChangeSelect } from '../../../components/ComboBox';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import styles from './styles.module.scss';

interface ISignupData {
  readonly name: string;
  readonly email: string;
  readonly state: string;
  readonly city: string;
  readonly password: string;
  readonly confirm: string;
}

export const SignupForm: FC = () => {
  const [formData, setFormData] = useState<ISignupData>({} as ISignupData);
  const [formErrors, setFormErrors] = useState<ISignupData>({} as ISignupData);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    const errors: ISignupData = {} as ISignupData;

    !formData.name &&
      Object.assign(errors, {
        name: 'Nome é obrigatório',
      });

    !formData.email &&
      Object.assign(errors, {
        email: 'Email é obrigatório',
      });

    !formData.state &&
      Object.assign(errors, {
        state: 'Estado é obrigatório',
      });

    !formData.city &&
      Object.assign(errors, {
        city: 'Cidade é obrigatória',
      });

    !formData.password &&
      Object.assign(errors, {
        password: 'Senha é obrigatória',
      });

    if (Object.keys(errors)?.length > 0) {
      setFormErrors(errors);
    } else {
      Object.keys(formErrors)?.length > 0 && setFormErrors({} as ISignupData);
      alert('segue o baile');
    }
  };

  const handleSelectChange: OnChangeSelect = useCallback((name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

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

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
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
        options={[
          { value: 'sp', label: 'São Paulo' },
          { value: 'rj', label: 'Rio de janeiro' },
          { value: 'sp', label: 'São Paulo' },
          { value: 'rj', label: 'Rio de janeiro' },
          { value: 'sp', label: 'São Paulo' },
          { value: 'rj', label: 'Rio de janeiro' },
        ]}
        value={formData.state}
        error={formErrors.state}
        onChange={handleSelectChange}
        width="259px"
      />

      <ComboBox
        name="city"
        placeHolder="Cidade"
        options={[]}
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
