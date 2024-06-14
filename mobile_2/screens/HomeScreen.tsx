import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpotFree</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar"
          onPress={() => navigation.navigate('Create')}
          color="#841584"
        />
        <Button
          title="Procurar"
          onPress={() => navigation.navigate('Read')}
          color="#841584"
        />
        <Button
          title="Atualizar"
          onPress={() => navigation.navigate('Update')}
          color="#841584"
        />
        <Button
          title="Deletar"
          onPress={() => navigation.navigate('Delete')}
          color="#841584"
        />
      </View>
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
  },
});
