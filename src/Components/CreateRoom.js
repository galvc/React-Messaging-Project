import React, { Component } from 'react'

class CreateRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            privacy: '',
            hasError: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        if (!this.state.hasError){
            console.log('handleSUbmit ' + this.state.hasError)

            this.props.createRoom({ 
                name: this.state.name,
                privacy: this.state.privacy 
            })
        }
    }

    handleChange(event) {
        const name = event.target.type === 'text' ? event.target.value : this.state.name
        const privacy = event.target.type === 'radio' ? event.target.value : this.state.privacy
        const hasError = (this.state.name.length === 0) || (this.state.privacy.length === 0)
        console.log('handleChange ' + this.state.hasError)
        this.setState({
            name,
            privacy,
            hasError
        })
    }
    render() {
        return (
            <div>
                <h1>Create a room</h1>
                {(this.state.hasError) && <p>You must enter a room name and choose a private or public room</p>}

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Room Name
                    <input type="text" name="Room Name" value={this.state.name} onChange={this.handleChange} placeholder="Enter a room name" />
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
            </div>
        )
    }
}

export default CreateRoom