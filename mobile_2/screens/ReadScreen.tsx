import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

interface Music {
  id_musica: number;
  titulo: string;
  duracao: number;
  id_album: number;
}

export default function ReadScreen() {
  const [musicId, setMusicId] = useState<string>('');
  const [albumId, setAlbumId] = useState<string>('');
  const [musicDetails, setMusicDetails] = useState<Music | null>(null);
  const [albumNome, setAlbumNome] = useState<string>('');
  const [allMusics, setAllMusics] = useState<Music[]>([]);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'single' | 'all' | 'none'>('none');

  const pesquisaMusicaID = async () => {
    try {
      const response = await axios.get(`http://192.168.1.6:3001/musicas/${musicId}`);
      setMusicDetails(response.data);
      setAlbumId(response.data.id_album);
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
      const response_album = await axios.get(`http://192.168.1.6:3001/albuns/${albumId}`);
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
      const response = await axios.get<Music[]>('http://192.168.1.6:3001/musicas');
      const sortedMusicas = response.data.sort((a, b) => a.id_musica - b.id_musica);
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
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar Música</Text>
      <TextInput
        style={styles.input}
        value={musicId}
        onChangeText={setMusicId}
        placeholder="Digite o ID da música"
      />
      <View style={styles.buttonContainer}>
        <Button title="Pesquisar" onPress={executa} color="#364D1F"/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Listar Todas as Músicas" onPress={listarTodasMusicas} color="#364D1F"/>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {viewMode === 'single' && musicDetails && (
        <View style={styles.wrapperSingleMusica}>
          <Text style={styles.allMusicTitle}>Música selecionada</Text>
          <View style={styles.songItem}>
            <Text style={styles.songTitle}>Título: {musicDetails.titulo}</Text>
            <Text style={styles.songTitle}>Duração: {(musicDetails.duracao / 60).toFixed(2)} minutos</Text>
            <Text style={styles.songTitle}>Nome do Álbum: {albumNome}</Text>
            <Text style={styles.songTitle}>Id da Música: {musicId}</Text>
          </View>
        </View>
      )}
      {viewMode === 'all' && allMusics.length > 0 && (
        <ScrollView style={styles.wrapperMusicas}>
          <Text style={styles.allMusicTitle}>Todas as Músicas</Text>
          {allMusics.map((music) => (
            <View key={music.id_musica} style={styles.songItem}>
              <Text style={styles.songTitle}>Título: {music.titulo}</Text>
              <Text style={styles.songTitle}>Duração: {(music.duracao / 60).toFixed(2)} minutos</Text>
              <Text style={styles.songTitle}>ID do Álbum: {music.id_album}</Text>
              <Text style={styles.songTitle}>Id da Música: {music.id_musica}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  wrapperSingleMusica: {
    marginTop: 20,
    alignItems: 'center', 
  },
  allMusicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  songItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%', 
  },
  songTitle: {
    fontSize: 16,
  },
  wrapperMusicas: {
    marginTop: 20,
    width: '100%',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 12, 
  },
});
