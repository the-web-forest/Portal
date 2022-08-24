import styles from './styles.module.scss';
interface NurseryMenuProps {
  biomes: {
    name: string;
    selected: boolean;
  }[];
  changeBiomeFunction: any;
}

const NurseryMenu = ({ biomes, changeBiomeFunction }: NurseryMenuProps) => {
  const getButton = (name: string, selected: boolean) => {
    return (
      <div
        className={selected ? styles.buttonSelected : styles.button}
        onClick={() => changeBiomeFunction(name)}
      >
        {name}
        <div className={styles.selected}></div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {biomes.map(biome => getButton(biome.name, biome.selected))}
    </div>
  );
};

export default NurseryMenu;
