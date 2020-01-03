import React from 'react';
import './App.css';
import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
} from "@pusher/chatkit-client-react"

const tokenProvider = new TokenProvider({
  url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c6a5d99-78d6-4550-917c-1e07fe8f5fab/token",
});
    const instanceLocator = "v1:us1:6c6a5d99-78d6-4550-917c-1e07fe8f5fab"
    const userId = "usera"

function App() {
  return (
    <div className="App">
      <ChatkitProvider
        instanceLocator={instanceLocator}
        tokenProvider={tokenProvider}
        userId={userId}
      >
        <WelcomeMessage />
      </ChatkitProvider>
    </div>
  );
}

const WelcomeMessage = withChatkit(props => {
  return (
    <div>
      {props.chatkit.isLoading
        ? 'Connecting to Chatkit...'
        : `Hello ${props.chatkit.currentUser.name}!`}
    </div>
  );
});

export default App;
