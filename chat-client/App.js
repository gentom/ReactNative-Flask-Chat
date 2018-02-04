import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.input}</Text>
        <TextInput onChangeText={(val) => this.setState({input: val})} />
        <Button title='send' onPress={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
