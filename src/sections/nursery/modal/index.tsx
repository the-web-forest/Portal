import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { ITreeResponse } from '../../../infra/dtos/Trees/ITreesResponse.dto';
import styles from './styles.module.scss';
interface INurseryModalProps {
  tree: ITreeResponse | null;
  closeModal: () => void;
}

const NurseryModal = ({ tree, closeModal }: INurseryModalProps) => {
  return (
    <Modal
      isOpen={!!tree}
      isCentered
      onClose={closeModal}
      closeOnOverlayClick={true}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent className={styles.modal}>
        <ModalHeader className={styles.modalHeader}>
          <span className={styles.modalHeaderSpan}>
            Detalhes - {tree?.name}
          </span>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.modalBody}>{tree?.description}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NurseryModal;
