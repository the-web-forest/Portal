import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import styles from './styles.module.css';

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
  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const { name, value } = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        placeholder="Nome"
        name="name"
        value={formData.name}
        onChangeFunction={handleInputChange}
        width="352px"
      />
      <Input
        placeholder="Email"
        name="email"
        value={formData.email}
        onChangeFunction={handleInputChange}
        width="352px"
      />

      <span className={styles.passwordTitle}>Informe uma senha</span>

      <Input
        placeholder="Senha"
        name="password"
        type="password"
        value={formData.password}
        onChangeFunction={handleInputChange}
        width="259px"
      />
      <Input
        placeholder="Repetir senha"
        name="confirm"
        type="password"
        value={formData.confirm}
        onChangeFunction={handleInputChange}
        width="259px"
      />

      <FilledButton
        text="Cadastrar"
        color={FilledColor.green}
        type="function"
      />
    </form>
  );
};
