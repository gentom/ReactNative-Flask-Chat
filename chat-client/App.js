import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      msgs: [],
    };
  }

  onMsgSend(){
    const { input, msgs } = this.state;
    msgs.push(input);
  }

  render() {
    const { msgs } = this.state;
    return (
      <View style={styles.container}>
        <FlatList>
          data = {msgs}
          renderItem = {({item}) => <Text>{item}</Text>}
        </FlatList>
        <TextInput onChangeText={(val) => this.setState({input: val})} />
        <Button title='send' onPress={() => this.onMsgSend()} />
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
