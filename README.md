## What is this
This is a React Messaging App using Pusher's Chatkit API
I am following [this](https://github.com/pusher/build-a-slack-clone-with-react-and-pusher-chatkit#step-3-setup-a-basic-node-server)
tutorial and using it as a foundation to develop more features using the API's rich features.
The tutorial is dated. Some of the functions are deprecated.
I am inspired to make a chat app like this [react clone project](https://github.com/pusher/react-slack-clone)

## Status
- i did something with the current room, manually put it in state because i dont know if it's giving back an object or nothing
- i need to see ALL the rooms, so fetch all the rooms user is subscribed to 
- im not able to get all the rooms using server, i keep getting a 404. maybe running it on local computer might make a difference?
### Solved
- after commmenting .map out this error shows up in chatscreen.js - error reading request body error 400. See below
- messages weren't showing up, .map error. Solution: wrong this.state name. I also fixed the object properties for the message text, it has since been
deprecated
- TypeError: this.state.currentUser.isTypingIn is not a function, Solution: camel case typo >(
- I'm not able to see the typing indicator in action. How to know if I am typing? - typing indicator works


## Todo
[] Develop own UI
[] Can I use axios instead of fetch?
[] Generate own token provider instead of the test token?
[] Lock the window at set height so i dont have to scroll so far down cause there are so many msgs
[] display list of rooms, and join a room
[] create a room