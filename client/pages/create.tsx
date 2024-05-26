import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/styles.module.css';

interface MusicCreate {
  titulo: string;
  duracao: string;
  id_album: string;
}

const Create = () => {
  const [titulo, setTitulo] = useState('');
  const [duracao, setDuracao] = useState('');
  const [idAlbum, setIdAlbum] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addMusica = async () => {
    try {
      const data: MusicCreate = {
        titulo,
        duracao,
        id_album: idAlbum,
      };

      await axios.post(`http://localhost:3001/musicas`, data);
      setSuccessMessage('Música adicionada com sucesso!');
      setError('');
    } catch (error) {
      setError('Erro ao adicionar a música. Verifique os campos e tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar Música</h1>
      <input
        className={styles.input}
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        className={styles.input}
        type="text"
        value={duracao}
        onChange={(e) => setDuracao(e.target.value)}
        placeholder="Duração (em segundos)"
        required
      />
      <input
        className={styles.input}
        type="text"
        value={idAlbum}
        onChange={(e) => setIdAlbum(e.target.value)}
        placeholder="ID do Álbum"
        required
      />
      <button onClick={addMusica} className={styles.myButton}>Adicionar</button>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Create;
