import React, { Component } from 'react'
import styled from 'styled-components'


//very helpful to understand functions inside stateless components
//https://stackoverflow.com/questions/46138145/functions-in-stateless-components
//so this function only 'renders' once
//https://upmostly.com/tutorials/react-onclick-event-handling-with-examples
//using arrow function to pass argument
//https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
//https://gist.github.com/sebkouba/a5ac75153ef8d8827b98

const Button = styled.div`
    padding: 0.25em;
    border: 1px solid black;
`
const RoomItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
`

const List = styled.ul`
    padding-left: 0;
`

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

    handleOpenRoom = (room) => {
        console.log('starting to open a room from roomlist')
        console.log(room.id)
        this.props.openRoom(room)
    }
    //click the room name of joined rooms and updat the state.messages 
    //if i am in the current room dont let me handle openroom
    render() {

        return (
            <div>
                <h1>Room List</h1>
                <List>
                    {this.props.joinedRooms.map((room, index) => 
                        <RoomItem key={index}>
                            <span onClick={() => this.handleOpenRoom(room)}>{room.name}</span>
                        

                            <Button onClick={() => this.handleLeave(room)}>Leave Room</Button>
                        </RoomItem>
                    )}
                </List>
                <List>
                    {this.props.joinableRooms.map((room, index) => 
                        <RoomItem key={index}>
                        {room.name}
                            <Button onClick={() => this.handleJoin(room)}>Join Room</Button>
                        </RoomItem>
                    )}
                    
                </List>
                
            </div>
        )
    }
}

export default RoomList