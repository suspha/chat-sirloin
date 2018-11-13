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
  const doc = await db.get('message').insert(data)
  console.log(doc)
  // Broadcast Mongodb document to all clients
  app.websocket.clients.forEach((c) => {
    doc.own = c.id === client.id
    c.send(doc)
  })
})

app.action('load', async (data, client) => {
  // hente alle dataene fra db
  const messages = await db.get('message').find({}, { sort: { _id: -1 } })
  return { result: messages }
})