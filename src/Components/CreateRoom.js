import React, { Component } from 'react'

class CreateRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomName: '',
            privacy: '',
            roomNameValid: false,
            privacyValid: false,
            showError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()


        console.log(this.state.roomNameValid + ' ' + this.state.privacyValid)

        if (this.state.roomNameValid && this.state.privacyValid) {
            console.log('both are valid')
            this.setState({ showError: false })
            const room = {
                roomName: this.state.roomName,
                privacy: this.state.privacy
            }
            console.log('all valid')
            this.props.createRoom({ room })
        }

    }

    handleChange(event) {
        const roomName = event.target.type === 'text' ? event.target.value : this.state.roomName
        const privacy = event.target.type === 'radio' ? event.target.value : this.state.privacy

        this.setState({
            roomName,
            privacy
        })

        if (this.state.roomName.length > 0) {
            console.log('room name is valid')
            this.setState({ roomNameValid: true })
        } else {
            this.setState({ roomNameValid: false, showError: true })
        }

        if (this.state.privacy.length > 0) {
            console.log('privacy is valid')
            this.setState({ privacyValid: true })
        } else {
            this.setState({ privacyValid: false, showError: true })
        }
    }
    render() {
        return (
            <div>
                <h1>Create a room</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Room Name
                    <input type="text" name="Room Name" value={this.state.roomName} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Privacy
                        <input type="radio" name="privacy" value="private" onChange={this.handleChange} />Private
                        <br />
                        <input type="radio" name="privacy" value="public" onChange={this.handleChange} />Public
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    {(!this.state.roomNameValid && this.state.showError) && <p>You must have a room name</p>}
                    {(!this.state.privacyValid && this.state.showError) && <p>You must choose between a public and private room</p>}
                </div>
            </div>
        )
    }
}

export default CreateRoom