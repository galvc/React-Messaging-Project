import React, { Component } from 'react'

class CreateRoom extends Component {


    render() {
        return (
            <div>
                This is create a room
                <form>
                    Room Name
                    <input type="text" name="Room Name" />
                    <br />
                    <input type="radio" name="privacy" value="private" />Private
                    <br />
                    <input type="radio" name="privacy" value="public" />Public
                </form>
            </div>
        )
    }
}

export default CreateRoom