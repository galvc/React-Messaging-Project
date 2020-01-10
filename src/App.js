import React, { Component } from 'react';
import './App.css';
import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
} from "@pusher/chatkit-client-react"
import UsernameForm from './Components/UsernameForm'
import ChatScreen from './ChatScreen'

const tokenProvider = new TokenProvider({
  url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c6a5d99-78d6-4550-917c-1e07fe8f5fab/token",
});
const instanceLocator = "v1:us1:6c6a5d99-78d6-4550-917c-1e07fe8f5fab"
const userId = "usera"
const localhost = 'https://3000-a472df6c-5a6c-426c-abc7-6c5a44e38135.ws-us02.gitpod.io'
// const localhost = 'http://localhost:3000'

//https://github.com/pusher/build-a-slack-clone-with-react-and-pusher-chatkit#step-3-setup-a-basic-node-server
class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUsername: '',
      currentScreen: 'none'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    fetch(`${localhost}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(response => {
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      })
      .catch(error => console.error('error', error))
  }


  render() {
    if (this.state.currentScreen === 'none') { //why not use a router?
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    }
    if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
  }
}

export default App;
