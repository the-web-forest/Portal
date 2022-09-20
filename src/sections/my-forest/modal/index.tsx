import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { IPlantResponse } from '../../../infra/dtos/Plant/IPlantResponse.dto';
import styles from './styles.module.scss';
interface IGalleryModalProps {
  plant: IPlantResponse | null;
  closeModal: () => void;
}

const GalleryModal = ({ plant, closeModal }: IGalleryModalProps) => {
  return (
    <Modal
      isOpen={!!plant}
      isCentered
      onClose={closeModal}
      closeOnOverlayClick={true}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent className={styles.modal}>
        <ModalHeader className={styles.modalHeader}>
          <span className={styles.modalHeaderSpan}>
            Detalhes - {plant?.species}
          </span>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          className={styles.modalBody}
          dangerouslySetInnerHTML={{
            __html: plant?.description || '',
          }}
        ></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GalleryModal;
