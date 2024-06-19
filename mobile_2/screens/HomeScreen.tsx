import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SpotFree</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Adicionar"
            onPress={() => navigation.navigate('Create')}
            color="#364D1F"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Procurar"
            onPress={() => navigation.navigate('Read')}
            color="#364D1F"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Atualizar"
            onPress={() => navigation.navigate('Update')}
            color="#364D1F"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Deletar"
            onPress={() => navigation.navigate('Delete')}
            color="#364D1F"
          />
        </View>
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
    justifyContent: 'space-around', 
    flexDirection: 'row',
    flexWrap: 'wrap', 
  },
  button: {
    width: '45%', 
    marginBottom: 12, 
  },
});
