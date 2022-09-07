import Image from 'next/image';
import { ChangeEventHandler } from 'react';
import styles from './styles.module.scss';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
}

const SearchInput = ({
  placeholder = 'Pesquisar',
  value,
  onChange,
  onSearch,
}: SearchInputProps) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className={styles.icon} onClick={onSearch}>
        <Image src={'/icons/search-icon.svg'} width={30} height={30} />
      </div>
    </div>
  );
};

export default SearchInput;
