import { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import FilledButton, { FilledColor } from '../../components/FilledButton';
import { AuthContext } from '../../contexts/AuthContext';
import pagePaths from '../../infra/core/pagePaths';
import ITreesResponseDTO, {
  ITreeResponse,
} from '../../infra/dtos/Trees/ITreesResponse.dto';
import GetBiomesUseCase from '../../infra/useCases/getBiomes.usecase';
import GetTreesByBiomeUseCase from '../../infra/useCases/getTreesByBiome.usecase';
import Header from '../../sections/header';
import NurseryGallery from '../../sections/nursery/gallery';
import NurseryMenu from '../../sections/nursery/menu';
import NurseryModal from '../../sections/nursery/modal';
import styles from './styles.module.scss';

const DEFAULT_TREE_QUANTITY = 10;
const getBiomesUseCase = new GetBiomesUseCase();
const getTreesByBiomeUseCase = new GetTreesByBiomeUseCase();

const Viveiro: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const [biomes, setBiomes] = useState<{ name: string; selected: boolean }[]>(
    [],
  );
  const [treeList, setTreeList] = useState<ITreesResponseDTO>();
  const [treeToShow, setTreeToShow] = useState<ITreeResponse | null>(null);

  const changeSelectedBiome = (biomeName: string) => {
    setTreeList(undefined);
    const newBiomes = biomes.map(biome => {
      biome.selected = false;
      if (biome.name == biomeName) {
        biome.selected = true;
      }
      return biome;
    });
    setBiomes(newBiomes);
  };

  const loadMoreTrees = () => {
    const selectedBiome = biomes.find(biome => biome.selected);

    if (!selectedBiome) {
      return;
    }

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
      });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      signOut();
    }
  }, [isAuthenticated, signOut]);

  useEffect(() => {
    getBiomesUseCase
      .run()
      .then(response => {
        const newBiomes = response.map((biome, index) => {
          return { name: biome, selected: index == 0 ? true : false };
        });
        setBiomes(newBiomes);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!biomes.length) {
      return;
    }

    const selectedBiome = biomes.find(biome => biome.selected);

    if (!selectedBiome) {
      return;
    }

    getTreesByBiomeUseCase
      .run(selectedBiome.name, DEFAULT_TREE_QUANTITY, 0, true)
      .then(trees => {
        setTreeList(trees);
      })
      .catch(err => {
        console.error(err);
      });
  }, [biomes]);

  return (
    <>
      <Header title="Viveiro" />
      <div id="container" className={styles.container}>
        <NurseryModal
          tree={treeToShow}
          closeModal={() => setTreeToShow(null)}
        />

        <p className={styles.title}>
          Escolha abaixo uma Árvore e comece <br /> a revolução ambiental
        </p>

        <NurseryMenu
          biomes={biomes}
          changeBiomeFunction={changeSelectedBiome}
        />

        <NurseryGallery treeList={treeList} showTreeModal={setTreeToShow} />

        {treeList?.trees.length !== treeList?.totalCount && (
          <div className={styles.loadMore}>
            <span onClick={() => loadMoreTrees()}>Visualizar mais árvores</span>
          </div>
        )}
      </div>
      <div className={styles.plantNow}>
        <div className={styles.button}>
          <FilledButton
            color={FilledColor.budGreen}
            onClick={() => router.push(pagePaths.payment.shoppingCart)}
            type="submit"
            width="100%"
            disabled={false}
          >
            Plante agora
          </FilledButton>
        </div>
      </div>
    </>
  );
};

export default Viveiro;
