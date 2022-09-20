import styles from './styles.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import pagePaths from '../../../infra/core/pagePaths';
import { AiFillEye, AiFillInfoCircle } from 'react-icons/ai';
import { IPlantResponse } from '../../../infra/dtos/Plant/IPlantResponse.dto';
import { SetStateAction } from 'react';

interface ForestGalleryItemProps {
  data: IPlantResponse;
  openModal: any;
}

const ForestGalleryItem = ({ data, openModal }: ForestGalleryItemProps) => {
  const router = useRouter();

  const canCustomize = (): boolean => {
    return !data.name && !data.message && data.hastags.length == 0;
  };

  const customizePlant = (plantId: string) => {
    router.push({
      pathname: `${pagePaths.forest.plant}/${plantId}`,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.photoFrame}>
          <Image
            src={data.image}
            width={100}
            height={50}
            layout="responsive"
            className={styles.photo}
          />
          <div className={styles.species}>{data.species}</div>
        </div>
        <p className={styles.name}>{data.name || data.species}</p>
        <p className={styles.order}>Pedido {data.orderId || 'Parceiro'}</p>
        <div className={styles.line}>
          {canCustomize() ? (
            <div
              className={styles.customize}
              onClick={() => customizePlant(data.id)}
            >
              <div className={styles.customizeIcon}>
                <Image width={20} height={20} src={'/icons/pencil-edit.svg'} />
              </div>
              <a className={styles.details}>Personalizar</a>
            </div>
          ) : (
            <div
              className={styles.customize}
              onClick={() => customizePlant(data.id)}
            >
              <div className={styles.customizeIcon}>
                <AiFillEye
                  color="#63AF53"
                  style={{ width: '24px', height: '24px' }}
                />
              </div>
              <a className={styles.details}>Visualizar</a>
            </div>
          )}
          <div className={styles.customize} onClick={() => openModal(data)}>
            <div className={styles.customizeIcon}>
              <AiFillInfoCircle
                color="#63AF53"
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            <a className={styles.details}>Detalhes</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForestGalleryItem;
