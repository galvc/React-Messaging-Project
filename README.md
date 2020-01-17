## What is this
This is a React Messaging App using Pusher's Chatkit API
I am following [this](https://github.com/pusher/build-a-slack-clone-with-react-and-pusher-chatkit#step-3-setup-a-basic-node-server)
tutorial and using it as a foundation to develop more features using the API's rich features.
The tutorial is dated. Some of the functions are deprecated.
I am inspired to make a chat app like this [react clone project](https://github.com/pusher/react-slack-clone)

## Status
- i did something with the current room, manually put it in state because i dont know if it's giving back an object or nothing
- know if i am subscribed to the room or not, show a prompt or message
- my rooms array change it to rooms i am a member of not all the rooms??? or do a filter inside the roomlist
- i always join the first room in general because of the connect hooks in chatscreen
- looks like there is a bug with leaving the general room the first time, but will look into it later
- working on fetching the list of users when you open a room, getting users is triggered by both
joining a room and clicking the room name. i either can make a state to open a room 
or do a method for it. i am thinking of creating another method that does this instead of having several
methods placed all over the place: (joinRoom) -> openRoom -> fetchmessages & fetchuserlist of current room
speaking of state, openroom should also change the currentroom state, maybe that will trigger the user list state
so that we may not need anymore additional functions
- should i check if user is in the room or do i let the error handler do it for me?
- what if I just put the joinscreen inside the roomlist? now i wont have to go through the parent component,
all i would need to do is update the state when and if the user joins
- i must be subscribed to the room to see the users
i might not need to fetch messages if i just subscribe to it.. or? because i can only subscribe once.....??
whats the difference between subscribing to a room to get messages and just fetching messages? - receiving realtime updates
u are still part of the room even if you are disconnected. so to make it easie and better, just subscribe to the room instead 
of using the joinroom function
when subscribing twice is there a big difference? 
- i cannot subscribe when i click the room name because it joins me as a member. might have to subscribe in a different way or...
i will just do the handling with room list i think. i will not change this
- subscribing to a room gives me a function not found error.... i believe it is because i did not wrap it in an array bracket
apparently the messages are not iterable because i used a spread operator, i guess i should only use that when i am adding to the array?
so im still wrong - i should use both array brackets and spread operator because the messages come one after the other and not in all one dump
//im trying to disable the openrooms in roomlist, but the equality is not working,
i am thinking maybe it's because the joinedroom state which is higher than the prop is not changing therefore the buttons stay the same (clickable)
or maybe nott, bug is still there - it;s just not gonna work this way i will have t do the checking in state, component will nto be rendered every time i click
so thats why there is no change
http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html

- i also have another problem where createroom() and createroom = () => how diff are they?
! - when i create a room, updat the roomlist and switch to that room 
what is the difference between being added and joining  a room in the hooks? - prpably the other one is for other users joining a room
- use either room name or component name...
-maybe use a popup for createroom instead
-  room header + chatlist or room header / chatlist = what are the pros and cons???
-delete room works after giving a the permissions, however the roomlist does not get updaeted
- add more hooks
- when i delete a room, i am still in that currentroom state so i get subscription errors
when i moved the currentroom setstate from hooks to delete room it is ok, 
- joinable rooms are not updating properly
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
- when to turn off isjoined and do i need it? is there a better way to show the component?  - no more isjoined
- can i see the messages of a room without joining? - no, i have created a different screen to let the user know that you need to join first
- replace the chat messages in the chatscreen with the messages of the new joined room - ok
- i need to be subscribed first before i can set the users
solutions: the only thing i really needed to do was make sure the currentRoom state isbeing updated, the users
are being taken from the currentRoom anyway. so if that changes then the users will change and that will cascade down
-validity of inputs are both false even though in state they are true
i guess when the function retrieves the data of the state it doesn't retrieve it in real time which is why either the validation
doesnt work real time or both equating to false  - for now im using both instruction and error as the same line
- the handlechange of privacy dioesnt work properly, i also need to convert it into boolean
onaddedtoroom doesnt work - im using the wrong hooks this is for the  connection hook, i put it in the room subscription hook - IT WORKS NOW
-trying to create a room. i want to change the chatlist component to create a room component
-creatin g a new room wont work because im passing an object within an object,. i made a new object before passing that into props and thats whats
making it not work
- when i have deleted a room, use the first joined room's screen
im getting bugs --- when i create a room, i try to change the ucrrent room to it so the screen changes... it is telling 
me that i am currently not subscribed so it wont delete the room
    Created room called aaaa
    ChatScreen.js:292 joining from chatscreen ee7ba556-4818-412c-b46e-0661fcad3035
    ChatScreen.js:305 Joined room with ID: ee7ba556-4818-412c-b46e-0661fcad3035
    index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    ChatScreen.js:188 this updates the current users joined rooms[object Object],[object Object],[object Object]
    ChatScreen.js:211 this is the updated state of joinable rooms: [{"createdAt":"2020-01-04T21:43:37Z","createdByUserId":"a","id":"f53a5a42-ecca-4112-b4ee-8b836f687b35","isPrivate":false,"name":"room 2","updatedAt":"2020-01-04T21:43:37Z"}]
    im calling setstate currentroom: room too early in the hooks!!! - i set the state of current room after updating everything else in create and join room
- move leave room to the currentroomheader
- i have redundant functions fetch messages and open room...openroom is basically just subscribing to it...
-im trying to make the active room different

## Todo
[x] Develop own UI - created UI in Figma
[] Can I use axios instead of fetch?
[] Generate own token provider instead of the test token?
[] Lock the window at set height so i dont have to scroll so far down cause there are so many msgs
[x] display list of rooms
[x] join a room
[x] create a room
[x] leave a room
[x] fetch messages of a room
[x] show u r not a member screen
[] subscribe to a room
[] update a room if you are admin
[x] update the list of users when room changes
[] delete a room 
[] notification section
[] tooltip https://github.com/wwayne/react-tooltip
[x] modify enterusername UI
[] add animatioNs

##Readings
- https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
<!-- - popup menu in react https://blog.logrocket.com/controlling-tooltips-pop-up-menus-using-compound-components-in-react-ccedc15c7526/ -->
