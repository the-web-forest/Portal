/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import IPlantResponseDTO from '../../infra/dtos/Plant/IPlantResponse.dto';
import GetPlantsByFilterUseCase from '../../infra/useCases/getPlantsByFilter.usecase';
import Header from '../../sections/header';
import ForestGallery from '../../sections/my-forest/gallery';
import styles from './styles.module.scss';

const DEFAULT_PLANT_QUANTITY = 12;
const getPlantsByFilterUseCase = new GetPlantsByFilterUseCase();

const Viveiro: NextPage = () => {
  const [plantList, setPlantList] = useState<IPlantResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const appendPlants = useCallback(
    (plants: IPlantResponseDTO) => {
      if (!plantList) {
        return;
      }
      const newState = { ...plantList };
      newState.plants.push(...plants.plants);
      setPlantList(newState);
    },
    [plantList],
  );

  const setPlants = useCallback((plants: IPlantResponseDTO) => {
    setPlantList(plants);
  }, []);

  const handlePlants = useCallback(
    (plants: IPlantResponseDTO, reset: boolean = false) => {
      if (reset || !plantList || !plantList.totalCount) {
        setPlants(plants);
      } else {
        appendPlants(plants);
      }
    },
    [appendPlants, setPlants],
  );

  const loadPlants = useCallback(
    async (requireTotal: boolean = false, reset: boolean = false) => {
      let skip = plantList ? plantList.plants.length : 0;
      skip = reset ? 0 : skip;
      setIsLoading(true);
      getPlantsByFilterUseCase
        .run(search, DEFAULT_PLANT_QUANTITY, skip, requireTotal)
        .then(plants => handlePlants(plants, reset))
        .catch(err => {
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    },
    [handlePlants, plantList, search],
  );

  const loadMorePlants = () => {
    loadPlants();
  };

  const searchPlants = () => {
    setPlantList(null);
    loadPlants(true, true);
  };

  useEffect(() => {
    loadPlants(true);
  }, []);

  return (
    <>
      <Header title="Minha Floresta" />
      <div id="container" className={styles.container}>
        <p className={styles.title}>Minhas árvores ({plantList?.totalCount})</p>

        <div className={styles.inputLine}>
          <div className={styles.search}>
            <SearchInput
              value={search}
              onChange={e => setSearch(e.target.value)}
              onSearch={searchPlants}
            />
          </div>
        </div>

        {plantList && <ForestGallery plantList={plantList} />}

        {plantList && !plantList.plants.length && !isLoading && (
          <div className={styles.infoMessage}>Nenhum registro encontrado</div>
        )}

        {isLoading && <div className={styles.infoMessage}>Carregando</div>}

        {plantList && plantList.plants.length !== plantList.totalCount && (
          <div
            className={isLoading ? styles.loadMoreDisabled : styles.loadMore}
          >
            <span onClick={() => loadMorePlants()}>
              {isLoading ? 'Carregando' : 'Visualizar mais árvores'}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Viveiro;
