import styles from './styles.module.scss';
import Image from 'next/image';
import ForestGalleryItem from '../gallery-item';
import IPlantResponseDTO from '../../../infra/dtos/Plant/IPlantResponse.dto';

interface ForestGalleryProps {
  plantList?: IPlantResponseDTO;
}

const ForestGallery = ({ plantList }: ForestGalleryProps) => {
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
      {!plantList && renderLoader()}
      {plantList?.plants.map(plant => (
        <ForestGalleryItem key={plant.id} data={plant} />
      ))}
    </div>
  );
};

export default ForestGallery;
