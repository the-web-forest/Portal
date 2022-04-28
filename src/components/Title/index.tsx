import styles from './style.module.scss';

interface TitleProps {
  text: string;
  color?: string;
}

const Title = ({ text, color = '#000' }: TitleProps) => {
  return (
    <div className={styles.title} style={{ color: color }}>
      {text}
    </div>
  );
};

export default Title;
