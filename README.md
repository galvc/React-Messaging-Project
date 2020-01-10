## What is this
This is a React Messaging App using Pusher's Chatkit API
I am following [this](https://github.com/pusher/build-a-slack-clone-with-react-and-pusher-chatkit#step-3-setup-a-basic-node-server)
tutorial and using it as a foundation to develop more features using the API's rich features.
The tutorial is dated. Some of the functions are deprecated.
I am inspired to make a chat app like this [react clone project](https://github.com/pusher/react-slack-clone)

## Status
- i did something with the current room, manually put it in state because i dont know if it's giving back an object or nothing
- replace the chat messages in the chatscreen with the messages of the new joined room
- know if i am subscribed to the room or not, show a prompt or message
- can i see the messages of a room without joining?
- my rooms array change it to rooms i am a member of not all the rooms??? or do a filter inside the roomlist
- i always join the first room in general because of the connect hooks in chatscreen

- looks like there is a bug with leaving the general room, but will look into it later
- when to turn off isjoined and do i need it? is there a better way to show the component? 

### Solved
- after commmenting .map out this error shows up in chatscreen.js - error reading request body error 400. See below
- messages weren't showing up, .map error. Solution: wrong this.state name. I also fixed the object properties for the message text, it has since been
deprecated
- TypeError: this.state.currentUser.isTypingIn is not a function, Solution: camel case typo >(
- I'm not able to see the typing indicator in action. How to know if I am typing? - typing indicator works
-  im not able to get all the rooms using server, i keep getting a 404. maybe running it on local computer might make a difference?
solution: i made a new chatkit instance and  used that in the chatscreen to get all the rooms regardless of user's subscription
 i also removed Chatkit.TokenProvider - it was giving me tokenprovider is not a constructor, was smooth after that
- i am able to join rooms, but have a hard time passing the roomid up to state/parent
solution: 'onClick={() => this.handleClick(room.id)}' importan to have this () => or else it just joins regardless of a trigger
i put the handleclick function back into the main function instead of separating it
'joinRoom = roomId =>' function format in the chatscreen.js
-proper chaining so i can get joinable rooms AFTER i have set the state of currentuser
- joinable rooms has no data??? i have one room tha should show up; the joinable rooms finish before i can get the current currentUserw
which is why there is no data for joinable rooms. solved: i just changed the promise chain and had it call the function
after the state has updated the currentuser. the roomlist loading works well. my question now is if it will
update if the joinable rooms have changed...
- how to update the join and leave room buttons
solution: create an updatejoinedrooms from the currentuser state, no need for a nw method
i just separated the joined and joijnable rooms for now
joinable rooms get updated, just need to update the joined state. just used the same  update methods for both leave and join
- how to check for empty object -> use hgetownproperty names
but i wonder if thats the best way to check..?
best way to pass data and state between siblings?
solution: share one state of an object instead of a boolean, to shorten the passing of so much data
- once you have joined delete the message. i can think of deleting it once i have joined, but what if i don't join? what if i just go to a different room...?
maybe this will work out better when i do the fetching of messages when room name is clicked
solution: for  now i cleared the roomtojoin state in the fetching messages function
- updated messages are not showing in messagelist
solution: i removed the initial id in the method, it was optional anyway. i will take care of the fetching again later
- i removed setjoinscreen, the only thing it does is update the state of roomtojoin. i just bundled it up with the fetchmessagesbyroom because the error
returns a 401 status code which means they are not a member of that room. so they are already checking for that. though i still wonder if theres a better way 
to let the component joinscreen know and show up for the alert


## Todo
[x] Develop own UI - created UI in Figma
[] Can I use axios instead of fetch?
[] Generate own token provider instead of the test token?
[] Lock the window at set height so i dont have to scroll so far down cause there are so many msgs
[x] display list of rooms
[x] join a room
[] create a room
[x] leave a room
[x] fetch messages of a room
[x] show u r not a member screen

##Readings
- https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
<!-- - popup menu in react https://blog.logrocket.com/controlling-tooltips-pop-up-menus-using-compound-components-in-react-ccedc15c7526/ -->
