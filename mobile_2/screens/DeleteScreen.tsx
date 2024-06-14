import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface MusicDetails {
    id: number;
    titulo: string;
    duracao: number;
    id_album: number;
}

export default function DeleteScreen() {
    const [musicId, setMusicId] = useState<string>('');
    const [musicDetails, setMusicDetails] = useState<MusicDetails | null>(null);
    const [exclusao, setExclusao] = useState<boolean>(false);
    const [textprint, setTextPrint] = useState<string>('');
    const [error, setError] = useState<string>('');

    const deletaMusicaId = async () => {
        try {
            await axios.delete(`http://192.168.1.6:3001/musicas/${musicId}`);
            setExclusao(true);
            setTextPrint('Excluída com sucesso');
            setError('');
        } catch (error) {
            setError('Erro ao excluir a música. Verifique o ID e tente novamente.');
            setExclusao(false);
            setTextPrint('Não foi excluída');
        }
    };

    const pesquisaMusicaID = async () => {
        try {
            const response = await axios.get(`http://192.168.1.6:3001/musicas/${musicId}`);
            setMusicDetails(response.data);
            setError('');
            return response.data.titulo;
        } catch (error) {
            setError('Erro ao buscar a música. Verifique o ID e tente novamente.');
            setMusicDetails(null);
            return null;
        }
    };

    const executa = async () => {
        try {
            // Verifica se o campo musicId está preenchido
            if (!musicId) {
                setError('Por favor, digite o ID da música.');
                return;
            }

            const musicName = await pesquisaMusicaID();
            if (musicName) {
                Alert.alert(
                    'Confirmar Exclusão',
                    `Deseja excluir a música '${musicName}'?`,
                    [
                        { text: 'Cancelar', style: 'cancel', onPress: () => setTextPrint('Cancelada a exclusão') },
                        { text: 'OK', onPress: deletaMusicaId },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deletar Música</Text>
            <TextInput
                style={styles.input}
                value={musicId}
                onChangeText={setMusicId}
                placeholder="Digite o ID da música"
            />
            <Button title="Deletar" onPress={executa} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {exclusao && (
                <View>
                    <Text style={styles.success}>Música {musicDetails?.titulo} {textprint}</Text>
                </View>
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
        width: '100%',
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
