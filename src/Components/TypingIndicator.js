import React, { Component } from 'react'

 class TypingIndicator extends Component {
     render() {
         if(this.props.usersWhoAreTyping.length > 0) { //take this out so i can see the indicator all the time
             return (
                 <div>Typing Indicator: 
                     {`${this.props.usersWhoAreTyping.slice(0,2).join(' and ')} is typing`}
                 </div>
             )
         }
         return <div />
     }
 }

 export default TypingIndicator