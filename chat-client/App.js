import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const serverURL = 'http://localhost:8668';
const http = axios.create({
  baseURL: serverURL,
});

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      msgs: [],
    };
  }

  onLogin(){
    const { isLoggedIn } = this.state;
    if(!isLoggedIn){

    }
  }

  onMsgSend(){
    const { input, msgs } = this.state;
    msgs.push(input);
  }


  render() {
    const { msgs, isLoggedIn } = this.state;
    return (
      <View style={styles.container}>

        <View>
          <Text>Login</Text>
          <TextInput style={{ backgroundColor: '#ededed' }} onChangeText={(val) => this.setState({username: val})} />
          <Button title='Login' onPress={() => this.onLogin()} />
          <Text>Online Status: {isLoggedIn ? 'Online' : 'Offline'}</Text>
        </View>

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
