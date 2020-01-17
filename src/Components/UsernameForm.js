import React, { Component } from 'react'
import styled from 'styled-components'

class UsernameForm extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
   }
   this.onSubmit = this.onSubmit.bind(this)
   this.onChange = this.onChange.bind(this)
 }

 onSubmit(e) {
   e.preventDefault()
   this.props.onSubmit(this.state.username)
 }

 onChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <UsernameFormContainer>
        <div className="form">
          <h2>What is your username?</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={this.onChange}
            />
            {this.state.username.length > 0 && <input type="submit" /> }
            {!this.state.username.length > 0 && <input type="submit" disabled /> }
            {/* <SubmitButton /> */}
          </form>
        </div>
      </UsernameFormContainer>
    )
  }
}

 export default UsernameForm

 const UsernameFormContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: #344055;
    display: flex;
    align-items: center;
    justify-content: center;

    div.form {
        text-align: center;
    }
    
    h2 {
        color: white;
        font-size: 1.75em;
    }
    input {
        height: 3em;
        width: 100%;
        border: 0;
        border-radius: 5px;
        margin-right: 0.75em;
        transition: max-height 0.3s ease-out;
    }

    input[type=text] {
        padding: 0 0.50em;
    }

    input[type=submit]:disabled {
        visibility: hidden;
    }

    input[type=submit] {
        background: #303B4E;
        font-weight: bold;
        font-size: 1em;
        color: white;
    }
 `