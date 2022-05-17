import { ChangeEventHandler, FC, FormEventHandler, useCallback, useState } from "react";
import FilledButton, { FilledColor } from "../../../components/FilledButton";
import Input from "../../../components/Input";
import { WebForestLogo } from "../../../components/WebForestLogo";
import styles from './styles.module.scss'

interface ILoginData {
  readonly email: string;
  readonly password: string;
}

export const LoginForm: FC = () => {
  const [data, setData] = useState<ILoginData>({} as ILoginData);

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      const { name, value } = event.target;
      setData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }, []);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
  }

  return (
    <div className={styles.container}>
      <WebForestLogo />
      <form onSubmit={handleSubmit}>
        <Input 
          name="email"
          placeholder='E-mail'
          width='100%'
          value={data.email}
          onChangeFunction={handleChangeInput}
        />
        <Input 
          name="password"
          placeholder='Senha'
          width='100%'
          value={data.password}
          onChangeFunction={handleChangeInput}
          type="password"
        />

        <FilledButton color={FilledColor.budGreen} width="100%">
          Entrar
        </FilledButton>

        <a href="https://google.com">
          <span>
            Esqueci minha senha
          </span>
        </a>
      </form>
    </div>
  )
}