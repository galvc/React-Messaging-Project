import React, { Component } from 'react'
import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
} from "@pusher/chatkit-client-react"
import Chatkit, { ChatManager } from "@pusher/chatkit-client"

const localhost = 'https://3000-a472df6c-5a6c-426c-abc7-6c5a44e38135.ws-us02.gitpod.io';

class ChatScreen extends Component {
    constructor(props){
        super(props) 
        this.state = {
            currentUser: {}
        }
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:6c6a5d99-78d6-4550-917c-1e07fe8f5fab',
            userId: this.props.currentUsername,
            // tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c6a5d99-78d6-4550-917c-1e07fe8f5fab/token' })
            tokenProvider: new Chatkit.TokenProvider({
                url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c6a5d99-78d6-4550-917c-1e07fe8f5fab/token`,
            }),
        })

        chatManager.connect()
        .then(currentUser => {
            this.setState({currentUser})
            console.log('Successful connection', currentUser)
        })
        .catch(err => {
            console.log('Error on connection', err)
        })
    }







  render() {
    return (
      <div>
        <h1>Chat</h1>
      </div>
    )
  }
}

export default ChatScreen