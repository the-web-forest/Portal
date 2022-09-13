import { parseCookies, setCookie } from 'nookies';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import CookiesEnum from '../infra/core/CookiesEnum';
import IConfigurationData from '../infra/dtos/Configuration/IConfigurationData';
import GetConfigurationUseCase from '../infra/useCases/configuration/getConfiguration.usecase';

interface IConfigurationContextData {
  readonly values: IConfigurationData;
}

const ConfigurationContext = createContext<IConfigurationContextData>(
  {} as IConfigurationContextData,
);

const getConfigurationUseCase = new GetConfigurationUseCase();

const ConfigurationProvider: FC = ({ children }) => {
  const [values, setValues] = useState<IConfigurationData>(
    {} as IConfigurationData,
  );

  useEffect(() => {
    const { [CookiesEnum.APP_CONFIG]: config } = parseCookies();

    if (config) {
      setValues(JSON.parse(config) as IConfigurationData);
      return;
    }

    getConfigurationUseCase.run().then(res => {
      setCookie(undefined, CookiesEnum.APP_CONFIG, JSON.stringify(res), {
        maxAge: 60 * 60 * 1,
      });
      setValues(res);
    });
  }, []);

  return (
    <ConfigurationContext.Provider value={{ values }}>
      {children}
    </ConfigurationContext.Provider>
  );
};

const useConfig = () => useContext(ConfigurationContext);

export { useConfig, ConfigurationProvider };
