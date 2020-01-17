import React, { Component } from 'react'
import styled from 'styled-components'
import { FaInfo } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti'
import { GiExitDoor } from 'react-icons/gi'

//i need the current  room functions and object
const RoomHeader = styled.div`
    display: flex;
    justify-content: space-between;
    background: #4162FE;
    color: white;
    padding: 0 1em;

    h2 {
        margin: 0.5em 0;
    }

    ul.menu {
        list-style: none;
        display: flex;
        margin:0;
        padding-left: 0;
    }

    li {
        display: inline-block;
        padding: 0.7em 0.5em;
        opacity: 0.5;
    }

    li:hover {
        background: #637EFE;
        opacity: 1;
        cursor: pointer;
    }
`
class CurrentRoomHeader extends Component {

    render() {
        return (
            <RoomHeader>
                <h2>{this.props.currentRoom.name}</h2>
                <ul className="menu">
                    <li onClick={() => this.props.deleteRoom()}><TiDeleteOutline size={28} /></li>    
                    <li><FaInfo size={24} /></li>
                    <li onClick={() => this.props.leaveRoom()} ><GiExitDoor size={28} /></li>
                </ul>
            </RoomHeader>
            
        )
    }
}

export default CurrentRoomHeader