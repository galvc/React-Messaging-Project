const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:6c6a5d99-78d6-4550-917c-1e07fe8f5fab',
  key: 'a997b659-c3a6-4905-8674-cf62fa7fd2d2:gRuhe58vRd8Mzj1LNGPH2+5QDSx1coKBI9lG4fgUfJc=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

app.get('/rooms', (req, res) => {
    chatkit
    .getRooms({})
    .then(response => {
        console.log('got rooms', response)
        // res.send(response)
    })
    .catch(err => console.error(err))
})


const PORT = 3000
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})