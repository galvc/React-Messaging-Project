import React, { Component } from 'react'

class JoinScreen extends Component {

    handleJoin = (room) => {
        console.log('trying to join a room from joinscreen: ' + room)
        this.props.joinARoom(room)
    }
    render() {
        return (
            <div>
                <p>You are not joined in this room {this.props.roomToJoin.name}</p>
                <p onClick={() => this.handleJoin(this.props.roomToJoin)}>would you like to join? {this.props.needToJoin}</p>
                
            </div>
        )
    }
}

export default JoinScreen