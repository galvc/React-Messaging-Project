import React, { Component } from 'react'


//very helpful to understand functions inside stateless components
//https://stackoverflow.com/questions/46138145/functions-in-stateless-components
//so this function only 'renders' once
//https://upmostly.com/tutorials/react-onclick-event-handling-with-examples
//using arrow function to pass argument
//https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
//https://gist.github.com/sebkouba/a5ac75153ef8d8827b98


class RoomList extends Component {

    // change roomId to just room object
    handleJoin = (room) => {
        console.log(`joined the room ${room.id}`)
        
        this.props.joinARoom(room)
    }

    handleLeave = (room) => {
        this.props.leaveRoom(room)
    }

    handleIsJoined = (room) => {
        this.props.setJoinScreen(room)
    }

    handleFetchMessages = (room) => {
        console.log('starting to fetch message from roomlist')
        console.log(room.id)
        this.props.fetchMessages(room)
    }
    //click the room name of joined rooms and updat the state.messages 
    render() {
        return (
            <div>
                <h1>Room List</h1>
                <ul>
                    {this.props.joinedRooms.map((room, index) => 
                        <li key={index}>
                            <span onClick={() => this.handleFetchMessages(room)}>{room.name}</span>
                            <span onClick={() => this.handleLeave(room)}>Leave Room</span>
                        </li>
                    )}
                </ul>
                <ul>
                    {this.props.joinableRooms.map((room, index) => 
                        <li key={index}>
                        {/* lets ry to route everything to fetch messages and do i tfrom there, otherwise we go back to isjoined */}
                            <span onClick={() => this.handleFetchMessages(room)}> {room.name}</span>
                            <span onClick={() => this.handleJoin(room)}>Join Room</span>
                        </li>
                    )}
                    
                </ul>
                
            </div>
        )
    }
}

export default RoomList