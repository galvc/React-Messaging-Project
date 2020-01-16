import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 100vh;
    overflow-y: scroll;
    flex:1
    padding-right: 1em;
    background: #EFF6FE;
    padding: 2em;
    ul {
        list-style-type: none;
        padding-left: 0;
        display: flex;
        flex-direction: column;
    }

    li {
        margin: 1em 0;
        background: white;
        border-radius: 5px;
        width: fit-content; 
        min-width: 10em;
        padding: 0.50em;
    }

    .senderUsername {
        font-weight: bold;
    }

    p {
        margin-top: 0.5em
        margin-bottom: 0;
    }

    .currentUserMessage {
        align-self: flex-end;
    }
`

 class MessageList extends Component {
     
   render() {
     const styles = {

       message: { fontSize: 15 },
     }


     return (
       <Container>
       
         <ul>
           {this.props.messages.map((message, index) => (
             <li key={index} className={message.senderId === (this.props.currentUser.id) ? "currentUserMessage" : "" } > 
                <div>
                    <span className="senderUsername">{message.senderId}</span>
                    <p style={styles.message}>{message.parts[0].payload.content}</p>
                </div>
                {/* <span>{message.createdAt}</span> */}
             </li>
           ))}
         </ul>
       </Container>
     )
   }
 }

 export default MessageList