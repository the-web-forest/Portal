import ITreesResponseDTO, {
  ITreeResponse,
} from '../../../infra/dtos/Trees/ITreesResponse.dto';
import styles from './styles.module.scss';
import Image from 'next/image';
import ForestGalleryItem from '../gallery-item';

interface ForestGalleryProps {
  treeList?: ITreesResponseDTO;
}

const ForestGallery = ({ treeList }: ForestGalleryProps) => {
  const renderLoader = () => {
    return (
      <div className={styles.loader}>
        <Image src={'/loaders/load.gif'} height={50} width={50} />
        <p>Carregando...</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {!treeList && renderLoader()}
      {treeList?.trees.map(tree => (
        <ForestGalleryItem key={tree.id} data={tree} />
      ))}
    </div>
  );
};

export default ForestGallery;
