import React from 'react';
import './App.css';
import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
} from "@pusher/chatkit-client-react"

const WelcomeMessage = props => {
  return <div>Hello Chatkit!</div>
}
 
export default WelcomeMessage