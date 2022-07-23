import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import FilledButton, { FilledColor } from '../../../components/FilledButton';
import Input from '../../../components/Input';
import { WebForestLogo } from '../../../components/WebForestLogo';
import styles from './styles.module.scss';
import INewPasswordData from '../../../validations/DTO/INewPasswordData';
import AppError from '../../../infra/errors/AppError';
import ErrorCode from '../../../infra/errors/ErrorCodes';
import NewPasswordValidate from '../../../validations/NewPasswordForm.validate';
import { useRouter } from 'next/router';
import AttentionMessage from '../../../components/AttentionMessage';
import PasswordChangeUseCase from '../../../infra/useCases/passwordChange.usecase';
import pagePaths from '../../../infra/core/pagePaths';

export const NewPasswordForm: FC = () => {
  const router = useRouter();
  const [data, setData] = useState<INewPasswordData>({} as INewPasswordData);
  const [error, setError] = useState<INewPasswordData>({} as INewPasswordData);
  const [statusError, setStatusError] = useState(false);
  
  useEffect(() => {
    const TokenParam = router.query.token;
    const EmailParam = router.query.email;
    setData(prevState => ({
      ...prevState,
      token: TokenParam != undefined ? TokenParam.toString() :  undefined,
      email: EmailParam !== undefined ? EmailParam.toString() : undefined
    }));
  }, [router.query.token, router.query.email])

  const handleSubmit: FormEventHandler = 
  async event => {
    try{
      event.preventDefault();
      const errors = await new NewPasswordValidate().validate(data);
      if(Object.keys(errors)?.length > 0){
        setError(errors);
        return;
      }
      if(!(data.password == data.confirm)){
        setStatusError(true);
      }
      else{
        setStatusError(false);
        
        const response : boolean = await new PasswordChangeUseCase().run(data);
        (response) && router.push(pagePaths.passwordReset.success);
      }        
    } catch (err : any){
      //Criar Tratamento de erro
    }
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const { name, value } = event.target;
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
        <div
            className={styles.erroContainer}
            style={{ opacity: statusError ? 1 : 0 }}
          >
          <AttentionMessage message="Ops.. As senhas informadas não condizem!" />
        </div>
      <form onSubmit={handleSubmit}>
        <Input
          name="password"
          placeholder="Informar nova senha"
          width="100%"
          value={data.password}
          onChangeFunction={handleChangeInput}
          type="password"
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
