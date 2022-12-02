import {
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../../sections/header';
import styles from './styles.module.scss';
import Input from '../../components/Input';
import Select, {
  ISelectOptionsEntity,
  OnChangeSelect,
} from '../../components/Select';
import GetStatesUseCase from '../../infra/useCases/getStates.usecase';
import GetCitiesUseCase from '../../infra/useCases/getCities.usecase';
import GetUserInfoUseCase from '../../infra/useCases/user/getUserInfo.usecase';
import IUserInfoResponseDTO from '../../infra/dtos/User/IUserInfoResponse.dto';
import FilledButton, { FilledColor } from '../../components/FilledButton';
import UpdateUserFormValidate from '../../validations/DTO/UpdateUserForm.validate';
import UpdateUserUseCase from '../../infra/useCases/user/updateUser.usecase';
import ToastCaller from '../../infra/toast/ToastCaller';
import { Checkbox, useToast } from '@chakra-ui/react';

const getStatesUseCase = new GetStatesUseCase();
const getCitiesUseCase = new GetCitiesUseCase();
const getUserInfoUseCase = new GetUserInfoUseCase();
const updateUserInfoUseCase = new UpdateUserUseCase();

const MinhaConta = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState<IUserInfoResponseDTO>(
    {} as IUserInfoResponseDTO,
  );
  const [formErrors, setFormErrors] = useState<IUserInfoResponseDTO>(
    {} as IUserInfoResponseDTO,
  );
  const [statesOption, setStatesOption] = useState<ISelectOptionsEntity[]>([]);
  const [citiesOption, setCitiesOption] = useState<ISelectOptionsEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptedEmailInformation, setAcceptedEmailInformation] =
    useState<boolean>(false);
  const toast = useToast();

  const handleChange = useCallback(
    (event, mask?) => {
      let { name, value } = event.target;
      if (name === 'allowNewsletter') {
        setAcceptedEmailInformation(!acceptedEmailInformation);
      }
      if (mask) {
        value = mask(value);
      }
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        allowNewsletter: acceptedEmailInformation,
      }));
      if (formErrors[name as keyof IUserInfoResponseDTO]) {
        setFormErrors(prevState => ({
          ...prevState,
          [name]: undefined,
        }));
      }
    },
    [formErrors, acceptedEmailInformation],
  );

  const handleSelectChange: OnChangeSelect = useCallback(
    (name, value) => {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));

      if (formErrors[name as keyof IUserInfoResponseDTO]) {
        setFormErrors(prevState => ({
          ...prevState,
          [name]: undefined,
        }));
      }
    },
    [formErrors],
  );
  const handleSubmit: FormEventHandler = useCallback(
    async event => {
      event.preventDefault();
      console.table(formData);
      const errors = await new UpdateUserFormValidate().validate(
        formData,
        formErrors,
      );
      if (Object.keys(errors)?.length > 0) {
        setFormErrors(errors);
      } else {
        Object.keys(formErrors)?.length > 0 &&
          setFormErrors({} as IUserInfoResponseDTO);
        setIsLoading(true);
        updateUserInfoUseCase
          .run(formData)
          .then(() => {
            ToastCaller.Success(
              toast,
              'Sucesso',
              'Perfil atualizado com sucesso!',
            );
          })
          .finally(() => setIsLoading(false));
      }
    },
    [formData, formErrors, toast],
  );

  const loadCities = useCallback((state: string) => {
    if (!state) {
      return;
    }

    getCitiesUseCase.run(state).then(response => {
      const cities = response.cities;
      setCitiesOption(
        cities.map(value => {
          return {
            label: value,
            value: value,
          };
        }),
      );
    });
  }, []);

  const loadStates = useCallback(() => {
    getStatesUseCase.run().then(response => {
      setStatesOption(
        response.states.map(value => {
          return {
            label: value.name,
            value: value.initial,
          };
        }),
      );
    });
  }, []);

  useEffect(() => {
    getUserInfoUseCase.run().then(userData => {
      setFormData(userData);
      loadStates();
      loadCities(userData.state);
    });
  }, [loadCities, loadStates]);

  useEffect(() => {
    loadCities(formData.state);
  }, [formData.state, loadCities]);

  useEffect(() => {
    if (!formData.city || !citiesOption.length) {
      return;
    }

    const isValid = citiesOption
      ? !!citiesOption.find(x => x.value === formData.city)
      : false;

    if (!isValid) {
      setFormData(prevState => ({
        ...prevState,
        ['city']: '',
      }));
    }
  }, [citiesOption, formData.city]);
  return (
    <>
      <Header title="Minha Conta" />
      <div className={styles.container}>
        <div className={styles.title}>Minha conta</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.mainData}>
            <div className={styles.photo}>
              <Image
                src={user?.photo || '/images/icons/user.svg'}
                width={'150px'}
                height={'150px'}
              />
            </div>
            <div className={styles.firstForm}>
              <span className={styles.label}>Nome</span>
              <Input
                placeholder="Nome"
                name="name"
                id="name"
                inputMode="text"
                value={formData.name}
                error={formErrors.name}
                onChangeFunction={handleChange}
                disabled={isLoading}
                width="352px"
              />
              <span className={styles.label}>E-mail</span>
              <Input
                placeholder="E-mail"
                name="email"
                id="email"
                inputMode="text"
                value={formData.email}
                disabled={true}
                onChangeFunction={() => {}}
                width="352px"
              />
            </div>
          </div>
          <div className={styles.form}>
            <span className={styles.label}>Estado</span>
            <Select
              name="state"
              placeHolder={statesOption.length ? 'Estado' : 'Carregando'}
              options={statesOption}
              value={formData.state}
              error={formErrors.state}
              onChange={handleSelectChange}
              width="259px"
            />
            <span className={styles.label}>Cidade</span>
            <Select
              name="city"
              placeHolder={citiesOption.length ? 'Cidade' : 'Carregando'}
              options={citiesOption}
              value={formData.city}
              error={formErrors.city}
              onChange={handleSelectChange}
              width="259px"
              noOptionsMessage="Selecione um estado"
            />
          </div>

          <label itemID="allowNewsletter">
            <Checkbox
              iconColor="#65A944"
              colorScheme="write"
              size="md"
              type="checkbox"
              id="email-information"
              name="allowNewsletter"
              className={styles.emailInformation}
              onChange={handleChange}
              isChecked={formData.allowNewsletter}
            >
              <span>
                Desejo receber e-mails promocionais e informativos da Web Forest
              </span>
            </Checkbox>
          </label>
          <div>
            <FilledButton
              disabled={isLoading || !formData}
              type="submit"
              color={FilledColor.budGreen}
              width="153px"
            >
              Atualizar perfil
            </FilledButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default MinhaConta;
