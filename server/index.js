const mongo = require('mngo')
const Sirloin = require('sirloin')
const app = new Sirloin({port: 8081})

// Connect to db
let db
const connect = async () => { 
  db = await mongo.connect({ name: 'sirloin-chat' }) 
}
connect()

app.action('message', async (data, client) => {
  // save in Mongod 
  data.date = new Date()
  data.content = data.content.trim()
  const message = await db.get('message').insert(data)
  console.log(message)
  // Broadcast Mongodb document to all clients
  app.websocket.clients.forEach((c) => {
    c.send({ action: 'message', result: message })
  })
})

app.action('load', async (data, client) => {
  // hente alle dataene fra db
  const messages = await db.get('message').find({}, { sort: { _id: -1 } })
  return { result: messages }
})

app.action('delete', async (data, client) => {
  console.log(data)
  await db.get('message').delete({_id: db.id(data._id)})  
})