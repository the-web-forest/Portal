import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import ITreesResponseDTO, {
  ITreeResponse,
} from '../../infra/dtos/Trees/ITreesResponse.dto';
import GetBiomesUseCase from '../../infra/useCases/getBiomes.usecase';
import GetTreesByBiomeUseCase from '../../infra/useCases/getTreesByBiome.usecase';
import Header from '../../sections/header';
import ForestGallery from '../../sections/my-forest/gallery';
import NurseryModal from '../../sections/nursery/modal';
import styles from './styles.module.scss';

const DEFAULT_TREE_QUANTITY = 12;
const getBiomesUseCase = new GetBiomesUseCase();
const getTreesByBiomeUseCase = new GetTreesByBiomeUseCase();

const Viveiro: NextPage = () => {
  const router = useRouter();

  const [biomes, setBiomes] = useState<{ name: string; selected: boolean }[]>(
    [],
  );
  const [treeList, setTreeList] = useState<ITreesResponseDTO>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const loadMoreTrees = () => {
    const selectedBiome = biomes.find(biome => biome.selected);

    if (isLoading || !selectedBiome) {
      return;
    }

    setIsLoading(true);

    const skip = treeList ? treeList.trees.length : 0;

    getTreesByBiomeUseCase
      .run(selectedBiome.name, DEFAULT_TREE_QUANTITY, skip, false)
      .then(trees => {
        const newTrees = trees?.trees;
        const newTreesState = { ...treeList } as ITreesResponseDTO;
        newTreesState.trees?.push(...newTrees);
        setTreeList(newTreesState);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const searchPlants = () => {
    alert(`Buscando ${search}`);
  };

  useEffect(() => {
    getBiomesUseCase
      .run()
      .then(response => {
        setBiomes(
          response.map((biome, index) => {
            return { name: biome, selected: index == 1 ? true : false };
          }),
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!biomes.length) {
      return;
    }

    let selectedBiome = biomes.find(biome => biome.selected);

    if (!selectedBiome) {
      selectedBiome = biomes[0];
    }

    getTreesByBiomeUseCase
      .run(selectedBiome.name, DEFAULT_TREE_QUANTITY, 0, true)
      .then(trees => {
        setTreeList(trees);
      })
      .catch(err => {
        console.error(err);
      });
  }, [biomes, router]);

  return (
    <>
      <Header title="Minha Floresta" />
      <div id="container" className={styles.container}>
        <p className={styles.title}>Minhas árvores</p>

        <div className={styles.inputLine}>
          <div className={styles.search}>
            <SearchInput
              value={search}
              onChange={e => setSearch(e.target.value)}
              onSearch={searchPlants}
            />
          </div>
        </div>

        <ForestGallery treeList={treeList} />

        {treeList?.trees.length !== treeList?.totalCount && (
          <div
            className={isLoading ? styles.loadMoreDisabled : styles.loadMore}
          >
            <span onClick={() => loadMoreTrees()}>Visualizar mais árvores</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Viveiro;
