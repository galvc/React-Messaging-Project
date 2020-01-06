import React, { Component } from 'react'
import Chatkit, { ChatManager } from "@pusher/chatkit-client"
import MessageList from './Components/MessageList'
import SendMessageForm from './Components/SendMessageForm'
import TypingIndicator from './Components/TypingIndicator'
import WhosOnlineList from './Components/WhosOnlineList'
import RoomList from './Components/RoomList'

const localhost = 'https://3000-a472df6c-5a6c-426c-abc7-6c5a44e38135.ws-us02.gitpod.io';
// const localhost = 'http://localhost:3000'
const axios = require('axios')

class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            rooms: {},
            usersWhoAreTyping: [],
        }

        this.getAllRooms = this.getAllRooms.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:6c6a5d99-78d6-4550-917c-1e07fe8f5fab',
            userId: this.props.currentUsername,
            // tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c6a5d99-78d6-4550-917c-1e07fe8f5fab/token' })
            tokenProvider: new Chatkit.TokenProvider({
                //this does not work url: 'http://localhost:3001/authenticate'
                //might have to check later how client generated tokens work
                url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c6a5d99-78d6-4550-917c-1e07fe8f5fab/token`,
            }),
        })

        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser })
                console.log('Successful connection', currentUser)
                return currentUser.subscribeToRoomMultipart({
                    roomId: '5f11538b-edae-4663-aceb-916539c2c81e',
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            // console.log('received messages', message)
                            // console.log(this.state.messages) //object containing user and message info
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserStartedTyping: user => {
                            console.log(`User ${user.name} started typing`)
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                            })
                        },
                        //method and user variable is part of the docs
                        onUserStoppedTyping: user => {
                            this.setState({
                                //take all the list of typers then just remove one
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                    //username is the argument and matching it to the current user
                                )
                            })
                        },
                        onPresenceChanged: () => this.forceUpdate()
                    }
                });
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(err => {
                console.log('Error on connection', err)
            })
        this.getAllRooms()
        // console.log(this.state.rooms);
    }

   async getAllRooms() {
       try {
        const rooms = await axios.get(`/rooms`)
        console.log('getalllrooms shows ' + rooms)
        return rooms
       } catch(err) {
           console.log(err)
       }
    //  axios.get(`/rooms`)
    //   .then(rooms => {
    //       console.log('getallrooms going through')
    //     this.setState({
    //       rooms
    //     })
    //   })
    //   .catch(error => console.error('error in getallrooms function: ', error))
  }

    sendMessage(text) {
        this.state.currentUser.sendSimpleMessage({
            text,
            roomId: this.state.currentRoom.id
        })
            .then(messageId => {
                console.log(`Added message to the room`)
            })
            .catch(err => {
                console.log("Error adding message to the room")
            })
    }

    sendTypingEvent() {
        this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id })
            .then(() => {
                console.log("I am typing...")
            })
            .catch(err => {
                console.log(`Error sending typing indicator: ${err}`)
            })
    }

    render() {
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            },
            chatContainer: {
                display: 'flex',
                flex: 1,
            },
            whosOnlineListContainer: {
                width: '300px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: 'white',
            },
            chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
            },
        }

        return (
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                        <WhosOnlineList
                            currentUser={this.state.currentUser}
                            users={this.state.currentRoom.users}
                        />
                        <RoomList rooms={this.state.rooms} />
                        {/* like the messagelist, put the rooms in state then pass that to the component, map it */}
                    </aside>
                    <section style={styles.chatListContainer}>
                        <h2>Chat PLACEHOLDER</h2>
                        <MessageList
                            messages={this.state.messages}
                            style={styles.chatListContainer}
                        />
                        <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                        <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
                    </section>
                </div>
            </div>
        )

    }
}

export default ChatScreen