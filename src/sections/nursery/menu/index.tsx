import styles from './styles.module.scss';

const biomes = [
  'Amazônia',
  'Caatinga',
  'Mata Atlântica',
  'Serrado',
  'Pampa',
  'Pantanal',
];

const NurseryMenu = () => {
  return (
    <div className={styles.container}>
      {biomes.map(biome => (
        <div className={styles.button}>
          {biome}
          <div className={styles.selected}></div>
        </div>
      ))}
    </div>
  );
};

export default NurseryMenu;
