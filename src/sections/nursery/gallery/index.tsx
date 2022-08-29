import ITreesResponseDTO, {
  ITreeResponse,
} from '../../../infra/dtos/Trees/ITreesResponse.dto';
import NurseryGalleryItem from '../gallery-item';
import styles from './styles.module.scss';
import Image from 'next/image';

interface NurseryGalleryProps {
  treeList?: ITreesResponseDTO;
  showTreeModal: (tree: ITreeResponse) => void;
}

const NurseryGallery = ({ treeList, showTreeModal }: NurseryGalleryProps) => {
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
        <NurseryGalleryItem
          showTreeModal={showTreeModal}
          key={tree.id}
          data={tree}
        />
      ))}
    </div>
  );
};

export default NurseryGallery;
