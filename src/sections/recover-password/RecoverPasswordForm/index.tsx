import { useRouter } from "next/router";
import { FC, FormEventHandler, useState } from "react";
import FilledButton, { FilledColor } from "../../../components/FilledButton";
import Input from "../../../components/Input";
import { WebForestLogo } from "../../../components/WebForestLogo";
import { StrUtils } from "../../../utils/str-utils";
import styles from './styles.module.scss';

export const RecoverPasswordForm: FC = () => {
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

    router.push("/recuperar-senha/sucesso")
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
          error={emailError}
        />
        <div className={styles.footerButtons}>
          <FilledButton color={FilledColor.budGreen} width="140px" type="submit">
            Enviar
          </FilledButton>
          
          <a href="/">
            <span>
              Retornar para o login
            </span>
          </a>
        </div>
      </form>
    </div>
  )
}