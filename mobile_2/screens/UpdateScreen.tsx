// screens/UpdateScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

interface MusicUpdate {
  titulo: string;
  duracao: string;
  id_album: string;
}

export default function UpdateScreen() {
  const [musicId, setMusicId] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [duracao, setDuracao] = useState<string>('');
  const [idAlbum, setIdAlbum] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const atualizaMusica = async () => {
    try {
      const data: MusicUpdate = {
        titulo,
        duracao,
        id_album: idAlbum,
      };

      await axios.put(`http://192.168.1.6:3001/musicas/${musicId}`, data);
      setSuccessMessage('Música atualizada com sucesso!');
      setError('');
    } catch (error) {
      setError('Erro ao atualizar a música. Verifique os campos e tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Música</Text>
      <TextInput
        style={styles.input}
        value={musicId}
        onChangeText={setMusicId}
        placeholder="ID da Música"
      />
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título"
      />
      <TextInput
        style={styles.input}
        value={duracao}
        onChangeText={setDuracao}
        placeholder="Duração"
      />
      <TextInput
        style={styles.input}
        value={idAlbum}
        onChangeText={setIdAlbum}
        placeholder="ID do Álbum"
      />
      <Button title="Atualizar" onPress={atualizaMusica} color="#364D1F"/>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
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
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  success: {
    color: 'black',
    marginTop: 10,
  },
});

