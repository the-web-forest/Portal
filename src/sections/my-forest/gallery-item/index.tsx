import { ITreeResponse } from '../../../infra/dtos/Trees/ITreesResponse.dto';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import pagePaths from '../../../infra/core/pagePaths';
import { AiFillEye } from 'react-icons/ai';

interface ForestGalleryItemProps {
  data: ITreeResponse;
}

const ForestGalleryItem = ({ data }: ForestGalleryItemProps) => {
  const router = useRouter();

  const canCustomize = (): boolean => {
    return false;
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
          <div className={styles.species}>{data.name}</div>
        </div>
        <p className={styles.name}>{data.name}</p>
        <p className={styles.order}>Pedido {data.id}</p>
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
        </div>
      </div>
    </div>
  );
};

export default ForestGalleryItem;
