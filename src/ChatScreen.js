import React, { Component } from 'react'
import { ChatManager, TokenProvider } from "@pusher/chatkit-client"
import Chatkit from '@pusher/chatkit-server';
import MessageList from './Components/MessageList'
import SendMessageForm from './Components/SendMessageForm'
import TypingIndicator from './Components/TypingIndicator'
import WhosOnlineList from './Components/WhosOnlineList'
import RoomList from './Components/RoomList'
import JoinScreen from './Components/JoinScreen'
import CreateRoom from './Components/CreateRoom'
// const localhost = 'https://3000-a472df6c-5a6c-426c-abc7-6c5a44e38135.ws-us02.gitpod.io';
// const localhost = 'http://localhost:3000'

const chatkit = new Chatkit({
    instanceLocator: 'v1:us1:6c6a5d99-78d6-4550-917c-1e07fe8f5fab',
    key: 'a997b659-c3a6-4905-8674-cf62fa7fd2d2:gRuhe58vRd8Mzj1LNGPH2+5QDSx1coKBI9lG4fgUfJc=',
})

class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            currentRoomUsers: [],
            messages: [],
            rooms: [],
            users: [],
            joinedRooms: [],
            joinableRooms: [],
            roomToJoin: {},
            usersWhoAreTyping: [],
            isCreateRoomOpen: true,
        }

        this.getAllRooms = this.getAllRooms.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        this.createRoom = this.createRoom.bind(this)
        this.updateJoinedRooms = this.updateJoinedRooms.bind(this)
        this.getRoomsToJoin = this.getRoomsToJoin.bind(this)
        this.openRoom = this.openRoom.bind(this)
        this.leaveRoom = this.leaveRoom.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.fetchMessagesByRoom = this.fetchMessagesByRoom.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
    }

    componentDidMount() {

        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:6c6a5d99-78d6-4550-917c-1e07fe8f5fab',
            userId: this.props.currentUsername,
            // tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c6a5d99-78d6-4550-917c-1e07fe8f5fab/token' })
            tokenProvider: new TokenProvider({
                // url: '${localhost}/authenticate'
                //might have to check later how client generated tokens work
                url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6c6a5d99-78d6-4550-917c-1e07fe8f5fab/token`,
            }),
        })

        chatManager.connect({
            onAddedToRoom: room => {
            //should i change state or call the room fetch??...
            this.setState({
                joinedRooms: [...this.state.joinedRooms, room]
            })},
        })
            .then(currentUser => {
                this.setState({ currentUser })
                console.log(currentUser)
                console.log('Successful connection', currentUser)
                return currentUser
            })
            .then(currentUser => {
                this.updateJoinedRooms()
                this.getRoomsToJoin()

                return currentUser.subscribeToRoomMultipart({
                    roomId: currentUser.rooms[0].id,
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


    openRoom = (room) => {
        //this wil trigger fetch message, change the screen list and fetch user list or change its state
        // this.fetchMessagesByRoom(room)
        // this.setState({
        //     currentRoom: room,
        //     currentRoomUsers: room.users
        // })
        // console.log(room.users)
        console.log('this is the currentroom' + this.state.currentRoom)
        //if i am already in the currentroom dont do this....
        //comparison is not working properly

        //i need to be subscribed first before i can set the users
        this.setState({
            messages: []
        })
        this.state.currentUser.subscribeToRoomMultipart({
            roomId: room.id,
            hooks: {
                onMessage: message => {
                    console.log("received message", message)
                    this.setState({ messages: [...this.state.messages, message] })
                }
            },
            messageLimit: 10
        })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(error => {
                console.error("error:", error);
            })
    }

    createRoom(newRoom) {
        console.log('passed to create room successfully')
        this.state.currentUser.createRoom({
            // id: '#general',
            name: newRoom.name,
            // private: newRoom.privacy,
            // addUserIds: ['craig', 'kate'],
        }).then(room => {
            console.log(`Created room called ${room.name}`)
            })
        .catch(err => {
            console.log(`Error creating room ${err}`)
        })
    }

    updateJoinedRooms() {

        //must keep the ...
        // const joinedRooms = [...this.state.currentUser.rooms]
        this.setState({ joinedRooms: [...this.state.currentUser.rooms] })
        console.log('this updates the current users joined rooms' + this.state.joinedRooms)
    }
    getAllRooms() {
        chatkit.getRooms({})
            .then(rooms => {
                console.log(rooms)
                this.setState({ rooms })
            })
            .catch(err => console.error(err))
    }


    getCurrentUserRooms() {
        var cRooms = JSON.stringify(this.state.currentUser.roomStore.rooms)
        console.log(`these are the current user's rooms: ${cRooms}`)
        return this.state.currentUser.rooms
        //use joined rooms
    }

    getRoomsToJoin() {
        this.state.currentUser.getJoinableRooms()
            .then(rooms => {
                this.setState({ joinableRooms: rooms })
                console.log('this is the updated state of joinable rooms: ' + JSON.stringify(this.state.joinableRooms))
            })
            .catch(err => {
                console.log(`Error getting joinable rooms: ${err}`)
            })
    }


    leaveRoom = (room) => {
        console.log('leave room is clicked')
        this.state.currentUser.leaveRoom({ roomId: room.id })
            .then(room => {
                this.updateJoinedRooms()
                this.getRoomsToJoin()
            })
            .catch(err => {
                console.log(`Error leaving room ${room.id}: ${err}`)
            })

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

    fetchMessagesByRoom = (room) => {
        //mneed to track the oldest message wtf - optional
        //do i need to do checking for this or let the error make it work?
        //or do i just show an error handler in the roomlist???????
        console.log('fetching message from room id: ' + room.id)
        this.setState({ roomToJoin: {} }) //i wonder if this is the best location to clear the state?
        this.state.currentUser.fetchMultipartMessages({
            roomId: room.id,
            direction: 'older',
            limit: 10,
        })
            .then(messages => {
                console.log('showing messages from fetch messages in chat screen')
                console.log(messages)
                this.setState({ messages })
            })
            .catch(err => {
                console.log(`Error fetching messages: ${err}`)

                if (err.statusCode === 401) {
                    this.setState({ messages: [] })
                    this.setState({ roomToJoin: room })
                }
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

    joinRoom = room => {
        console.log('joining from chatscreen ' + room.id)

        this.state.currentUser.joinRoom({ roomId: room.id })
            .then(room => {
                console.log(`Joined room with ID: ${room.id}`)
                this.updateJoinedRooms()
                this.getRoomsToJoin()
                this.setState({ roomToJoin: {} })
            })
            .catch(err => {
                console.log(`Error joining room ${room.id}: ${err}`)
            })
    }

    //the only thinmg this does is update the state of roomtojoin
    // setJoinScreen = (room) => {
    //     console.log('setjoinscreen works with room: ' + room.id)
    //     // this.setState({ roomToJoin: room })
    //     // console.log(this.state.roomToJoin)
    // }
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
                        <RoomList
                            setJoinScreen={this.setJoinScreen}
                            joinARoom={this.joinRoom}
                            joinedRooms={this.state.joinedRooms}
                            joinableRooms={this.state.joinableRooms}
                            leaveRoom={this.leaveRoom}
                            openRoom={this.openRoom}
                        />
                        {/* like the messagelist, put the rooms in state then pass that to the component, map it */}
                        <p onClick={() => this.setState({ isCreateRoomOpen: !this.state.isCreateRoomOpen })}>Create a room</p>

                    </aside>
                    <section style={styles.chatListContainer}>
                        <h2>Chat PLACEHOLDER</h2>
                        {this.state.isCreateRoomOpen &&
                            <CreateRoom createRoom={this.createRoom} />
                        }

                        {Object.getOwnPropertyNames(this.state.roomToJoin).length >= 1 ?
                            <JoinScreen roomToJoin={this.state.roomToJoin} joinARoom={this.joinRoom} /> : null}

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