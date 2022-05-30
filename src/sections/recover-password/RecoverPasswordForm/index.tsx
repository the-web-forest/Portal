import { FC, FormEventHandler, useState } from "react";
import FilledButton, { FilledColor } from "../../../components/FilledButton";
import Input from "../../../components/Input";
import { WebForestLogo } from "../../../components/WebForestLogo";
import styles from './styles.module.scss';

export const RecoverPasswordForm: FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
  }

  return (
    <div className={styles.container}>
      <WebForestLogo />
      <h3>Recuperar senha</h3>
      <span>{`Enviaremos no e-mail os passos para recuperação da senha :)`}</span>
      <form onSubmit={handleSubmit}>
        <Input 
          name="email"
          placeholder='E-mail'
          width='100%'
          value={email}
          onChangeFunction={(event) => setEmail(event.target.value)}
        />
        <FilledButton color={FilledColor.budGreen} width="140px">
          Enviar
        </FilledButton>
      </form>
    </div>
  )
}