import React, { Component } from 'react'
import styled from 'styled-components'
//i need the current room functions and object
const RoomHeader = styled.div`
    display: flex;
    justify-content: space-between;
    background: gray;
    
    ul.menu {
        list-style: none;
    }

    li {
        display: inline-block;
    }
`
class CurrentRoomHeader extends Component {

    render() {
        return (
            <RoomHeader>
                <h2>{this.props.currentRoom.name}</h2>
                <ul className="menu">
                    <li onClick={() => this.props.deleteRoom()}>delete this room</li>    
                    <li>room information</li>
                </ul>
            </RoomHeader>
            
        )
    }
}

export default CurrentRoomHeader