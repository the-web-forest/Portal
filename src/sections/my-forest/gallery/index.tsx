import styles from './styles.module.scss';
import Image from 'next/image';
import ForestGalleryItem from '../gallery-item';
import IPlantResponseDTO, {
  IPlantResponse,
} from '../../../infra/dtos/Plant/IPlantResponse.dto';
import { SetStateAction } from 'react';

interface ForestGalleryProps {
  plantList?: IPlantResponseDTO;
  openModal: any;
}

const ForestGallery = ({ plantList, openModal }: ForestGalleryProps) => {
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
        <ForestGalleryItem openModal={openModal} key={plant.id} data={plant} />
      ))}
    </div>
  );
};

export default ForestGallery;
