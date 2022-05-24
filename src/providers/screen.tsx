import { createContext, FC, useContext } from 'react';
import { useMediaQuery } from '../hooks/media-query';

interface IScreenContext {
  readonly isMobile: boolean;
}

const ScreenContext = createContext<IScreenContext>({} as IScreenContext);

const ScreenProvider: FC = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 750px)');

  return (
    <ScreenContext.Provider value={{ isMobile }}>
      {children}
    </ScreenContext.Provider>
  );
};

const useScreen = () => useContext(ScreenContext);

export { useScreen, ScreenProvider };
