import { FC } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import styles from './styles.module.scss';

type Props = {
  message: string;
};

const AttentionMessage: FC<Props> = ({ message }) => {
  return (
    <div className={styles.error}>
      <BsExclamationCircle color="#B11A1A" size={16} />
      <span>{message}</span>
    </div>
  );
};

export default AttentionMessage;
