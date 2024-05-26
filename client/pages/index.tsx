import { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/styles.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SpotFree</h1>
      <div className={styles.button_container}>
        <Link href="/create">
          <button className={styles.myButton}>Adicionar</button>
        </Link>
        <Link href="/read">
          <button className={styles.myButton}>Procurar</button>
        </Link>
        <Link href="/update">
          <button className={styles.myButton}>Atualizar</button>
        </Link>
        <Link href="/delete">
          <button className={styles.myButton}>Deletar</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
