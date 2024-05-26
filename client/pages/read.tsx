import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/styles.module.css';

interface Music {
  id_musica: number;
  titulo: string;
  duracao: number;
  id_album: number;
}

const Read = () => {
  const [musicId, setMusicId] = useState('');
  var albumId = '';
  const [musicDetails, setMusicDetails] = useState<Music | null>(null);
  const [albumNome, setAlbumNome] = useState('');
  const [allMusics, setAllMusics] = useState<Music[]>([]);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'single' | 'all' | 'none'>('none');

  const pesquisaMusicaID = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/musicas/${musicId}`);
      setMusicDetails(response.data);
      albumId = response.data['id_album'];
      
      
      console.log('album' + albumId);
      setError('');
      setViewMode('single');
    } catch (error) {
      setError('Erro ao buscar a música. Verifique o ID e tente novamente.');
      setMusicDetails(null);
      setViewMode('none');
    }
  };

  const pesquisaNomeAlbum = async () => {
    try {
      setAlbumNome('');
      const response_album = await axios.get(`http://localhost:3001/albuns/${albumId}`);
      console.log(response_album.data)
      setAlbumNome(response_album.data.titulo);
      setError('');
    } catch (error) {
      setError('Não encontrado o álbum da música. Verifique o ID e tente novamente.');
      setAlbumNome('Não encontrado');
    }
  };

  const executa = async () => {
    try {
      await pesquisaMusicaID();
      await pesquisaNomeAlbum();
    } catch (error) {
      console.log(error);
    }
  };

  const listarTodasMusicas = async () => {
    try {
      const response = await axios.get<Music[]>('http://localhost:3001/musicas');
      const sortedMusicas = response.data.sort((a, b) => a.id_musica - b.id_musica);
      console.log(sortedMusicas)
      setAllMusics(sortedMusicas);
      setError('');
      setViewMode('all');
    } catch (error) {
      setError('Erro ao buscar todas as músicas.');
      setAllMusics([]);
      setViewMode('none');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pesquisar Música</h1>
      <input
        type="text"
        value={musicId}
        onChange={(e) => setMusicId(e.target.value)}
        placeholder="Digite o ID da música"
        required
      />
      <button onClick={executa} className={styles.myButton}>Pesquisar</button>
      <button onClick={listarTodasMusicas} className={styles.myButton}>Listar Todas as Músicas</button>
      {error && <p>{error}</p>}
      {viewMode === 'single' && musicDetails && (
        <div className={styles.wrapper_single_musica}>
          <h2 className={styles.all_music_title}>Música selecionada</h2>
          <div className={styles.song_item}>
            <p className={styles.song_title}>Título: {musicDetails.titulo}</p>
            <p className={styles.song_title}>Duração: {(musicDetails.duracao / 60).toFixed(2) + " minutos"}</p>
            <p className={styles.song_title}>Nome do Álbum: {albumNome}</p>
            <p className={styles.song_title}>Id da Música: {musicId}</p>
          </div>
          
        </div>
      )}
      {viewMode === 'all' && allMusics.length > 0 && (
        <div className={styles.wrapper_musicas}>
          <h2 className={styles.all_music_title}>Todas as Músicas</h2>
          {allMusics.map((music) => (
            <div key={music.id_musica} className={styles.song_item}>
              <p className={styles.song_title}>Título: {music.titulo}</p>
              <p className={styles.song_title}>Duração: {(music.duracao / 60).toFixed(2) + " minutos"}</p>
              <p className={styles.song_title}>ID do Álbum: {music.id_album}</p>
              <p className={styles.song_title}>Id da Música: {music['id_musica']}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Read;
