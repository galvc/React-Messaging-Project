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
    font-weight: bold;
    color: #7D8592;

    &:hover{
        cursor: pointer;
        color: #C7CAD0;
        transition: 0.3s all ease;
    }
`
const RoomItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    transition: 0.3s all ease;
    color: #C6C9CE;
    padding: 0.50em 0;
    &:hover {
        cursor: pointer;
        background: #2B3546;
    }

    &.active {
        background: #303B4E;
        color: white;
        font-weight: bold;
    }
`

const List = styled.ul`
    padding-left: 0;
`

class RoomList extends Component {

    handleJoin = (room) => {
        console.log(`joined the room ${room.id}`)
        
        this.props.joinARoom(room)
    }

    handleIsJoined = (room) => {
        this.props.setJoinScreen(room)
    }

    handleOpenRoom = (room) => {
        console.log('starting to open a room from roomlist')
        console.log(room.id)

        console.log('this is props: ' + this.props.currentRoom.id)
        this.props.openRoom(room)
        // this.props.fetchMessages(room)
    }
    render() {

        return (
            <div>
                <h1>Room List</h1>
                <List>
                    {this.props.joinedRooms.map((room, index) => 
                        
                        <RoomItem key={index} className={room.id === this.props.currentRoom.id ? "active" : ""}>
                            <span onClick={() => this.handleOpenRoom(room)}>{room.name}</span>
                        </RoomItem>
                    )}
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