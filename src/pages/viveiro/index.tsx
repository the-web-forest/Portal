import { useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FilledButton, { FilledColor } from '../../components/FilledButton';
import pagePaths from '../../infra/core/pagePaths';
import ITreesResponseDTO, {
  ITreeResponse,
} from '../../infra/dtos/Trees/ITreesResponse.dto';
import ToastCaller from '../../infra/toast/ToastCaller';
import GetBiomesUseCase from '../../infra/useCases/getBiomes.usecase';
import GetTreesByBiomeUseCase from '../../infra/useCases/getTreesByBiome.usecase';
import ANALYTICS_EVENTS from '../../lib/analytics/AnalyticsEvents';
import GoogleAnalytics from '../../lib/analytics/GoogleAnalytics';
import { useCart } from '../../providers/cart';
import Header from '../../sections/header';
import NurseryGallery from '../../sections/nursery/gallery';
import NurseryMenu from '../../sections/nursery/menu';
import NurseryModal from '../../sections/nursery/modal';
import styles from './styles.module.scss';

const DEFAULT_TREE_QUANTITY = 12;
const getBiomesUseCase = new GetBiomesUseCase();
const getTreesByBiomeUseCase = new GetTreesByBiomeUseCase();

const Viveiro: NextPage = () => {
  const toast = useToast();
  const cart = useCart();
  const router = useRouter();

  const [biomes, setBiomes] = useState<{ name: string; selected: boolean }[]>(
    [],
  );
  const [treeList, setTreeList] = useState<ITreesResponseDTO>();
  const [treeToShow, setTreeToShow] = useState<ITreeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeSelectedBiome = (biomeName: string) => {
    GoogleAnalytics.sendEvent(ANALYTICS_EVENTS.USER_CHANGED_BIOME, {
      biomeName,
    });
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

  const plantTrees = () => {
    GoogleAnalytics.sendEvent(ANALYTICS_EVENTS.USER_PRESSED_PLANT_NOW_BUTTON);
    if (cart.cartTotals.quantity > 0) {
      router.push(pagePaths.payment.shoppingCart);
    } else {
      ToastCaller.Warning(
        toast,
        'Atenção!',
        'Selecione ao menos uma árvore para plantar',
      );
    }
  };

  useEffect(() => {
    getBiomesUseCase
      .run()
      .then(response => {
        setBiomes(
          response.map((biome, index) => {
            return { name: biome, selected: index == 0 ? true : false };
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
          <div
            className={isLoading ? styles.loadMoreDisabled : styles.loadMore}
          >
            <span onClick={() => loadMoreTrees()}>Visualizar mais árvores</span>
          </div>
        )}
      </div>

      <div className={styles.plantNow}>
        <div className={styles.button}>
          <FilledButton
            color={FilledColor.budGreen}
            onClick={() => plantTrees()}
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
