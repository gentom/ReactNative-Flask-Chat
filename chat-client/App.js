import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';
import tail from 'lodash/tail';

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
      .then(() => this.onLoginSuccess())
      .catch((err) => console.log(err));
    } else {
      alert('You are already logged in !');
    }
  }

  onLoginSuccess(){
    this.setState({isLoggedIn: true});
    this.getMessages();
  }

  addMessage(data){
    const { msgs } = this.state;
    const { id, message } = data;
    msgs.push(data);
    this.setState({
      lastUpdated: new Date(),
      lastID: id,
    });
  }

  addMessageList(list){
    if (!list || list.length == 0) {
      return;
    } 
    const { msgs } = this.state;
    this.setState({
      msgs: [...msgs, ...list],
      lastUpdated: new Date(),
      lastID: tail(list).id,
    });
  }

  getMessages(){
    const { lastID } = this.state;
    // Get request to Flask Server
    http.get(lastID ? `/get/${lastID}` : '/get')
    .then((response) => this.addMessageList(response.data))
    .catch((err) => console.log(err));
  }

  onMsgSend(){
    const { input, username } = this.state;
    // POST to Flask Server
    http.post('/send', {
      username,
      message: input,
    })
    .then((response) => this.addMessage({
      message: input,
      id: response.data.id,
    }));
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

        <FlatList style={{ backgroundColor: '#ededed' }}>
          data = {msgs}
          renderItem = {({item}) => <Text>{item.message}</Text>}
          extraData = {lastUpdated}
        </FlatList>

        <View>
          <TextInput style={{ backgroundColor: '#ededed' }} onChangeText={(val) => this.setState({input: val})} />
          <Button title='send' onPress={() => this.onMsgSend()} />
        </View>

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

/*
# TODO
1. add Update(Check for new messages) function
*/
