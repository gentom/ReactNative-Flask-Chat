import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const serverURL = 'http://127.0.0.1:8668';
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
    const { isLoggedIn, username } = this.state;
    if(!isLoggedIn){
      // POST to Flask Server
      http.post('/login', {username})
      .then(() => this.setState({isLoggedIn: true}))
      .catch((err) => console.log(err));
    } else {
      alert('You are already logged in !');
    }
  }

  addMessage(message){
    const { msgs } = this.state;
    msgs.push(message);
    this.setState({
      lastUpdated: new Date(),
    });
  }

  onMsgSend(){
    const { input, username } = this.state;
    // POST to Flask Server
    http.post('/send', {
      username,
      message: input,
    })
    .then(() => this.addMessage(input));
  }


  render() {
    const { msgs, isLoggedIn, lastUpdated } = this.state;
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
          extraData = {lastUpdated}
        </FlatList>
        <TextInput style={{ height: 0, backgroundColor: '#ededed' }} onChangeText={(val) => this.setState({input: val})} />
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
