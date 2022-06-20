import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { WebForestLogo } from '../../../components/WebForestLogo';
import styles from './styles.module.scss';

interface INewPasswordData {
  readonly password: string;
  readonly confirm: string;
}

export const NewPasswordForm: FC = () => {
  const [data, setData] = useState<INewPasswordData>({} as INewPasswordData);
  const [error, setError] = useState<INewPasswordData>({} as INewPasswordData);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const { name, value } = event.target;
      console.log(name, value);
      setData(prevState => ({
        ...prevState,
        [name]: value,
      }));

      if (error[name as keyof INewPasswordData]) {
        setError(prevState => ({
          ...prevState,
          [name]: undefined,
        }));
      }
    },
    [error],
  );

  return (
    <div className={styles.container}>
      <WebForestLogo />
      <h3>Criar uma nova senha</h3>

      <form onSubmit={handleSubmit}>
        <Input
          name="password"
          placeholder="Informar nova senha"
          width="100%"
          value={data.password}
          onChangeFunction={handleChangeInput}
          error={error.password}
        />
        <Input
          name="confirm"
          placeholder="Repetir nova senha"
          width="100%"
          value={data.confirm}
          onChangeFunction={handleChangeInput}
          type="password"
          error={error.confirm}
        />

        <FilledButton type="submit" color={FilledColor.budGreen} width="100%">
          Cadastrar nova senha
        </FilledButton>
      </form>
    </div>
  );
};
