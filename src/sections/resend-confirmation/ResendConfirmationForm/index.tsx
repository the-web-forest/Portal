import { useRouter } from "next/router";
import { FC, FormEventHandler, useState } from "react";
import FilledButton, { FilledColor } from "../../../components/FilledButton";
import Input from "../../../components/Input";
import { WebForestLogo } from "../../../components/WebForestLogo";
import { StrUtils } from "../../../utils/str-utils";
import styles from './styles.module.scss';

export const ResendConfirmationForm: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    console.log('email: ', email);
    const isValidEmail = StrUtils.isEmailValid(email);
    if (!isValidEmail) {
      setEmailError("Atenção: Insira um e-mail válido");
      return;
    }

    emailError && setEmailError('');

    /**
     * chamar api.
     */

    router.push("/reenviar-confirmacao/sucesso")
  }

  return (
    <div className={styles.container}>
      <WebForestLogo />
      <h3>Reenviar e-mail de confirmação</h3>
      <span>Notamos que você já se cadastrou, vamos reenviar</span>
      <span>o link de confirmação, insira o seu e-mail.</span>
      <form onSubmit={handleSubmit}>
        <Input 
          name="email"
          placeholder='E-mail'
          width='100%'
          value={email}
          onChangeFunction={(event) => setEmail(event.target.value)}
          error={emailError}
        />
        <FilledButton color={FilledColor.budGreen} width="260px" type="submit">
          Reenviar confirmação
        </FilledButton>
      </form>
    </div>
  )
}