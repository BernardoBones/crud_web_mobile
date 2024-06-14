import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function CreateScreen() {
  const [titulo, setTitulo] = useState('');
  const [duracao, setDuracao] = useState('');
  const [idAlbum, setIdAlbum] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addMusica = async () => {
    if (!titulo || !duracao || !idAlbum) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      const data = {
        titulo,
        duracao,
        id_album: idAlbum,
      };

      await axios.post(`http://192.168.1.6:3001/musicas`, data);
      setSuccessMessage('Música adicionada com sucesso!');
      setError('');
      setTitulo('');
      setDuracao('');
      setIdAlbum('');
    } catch (error) {
      setError('Erro ao adicionar a música. Verifique os campos e tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Música</Text>
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
        placeholder="Duração (em segundos)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={idAlbum}
        onChangeText={setIdAlbum}
        placeholder="ID do Álbum"
        keyboardType="numeric"
      />
      <Button title="Adicionar" onPress={addMusica} />
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
  success: {
    color: 'green',
    marginTop: 10,
  },
});
