import mongoose = require('mongoose')
export const initDB = () => {
   mongoose.connect(
      'mongodb://127.0.0.1:27017/mongo-graphql',
      { useNewUrlParser: true,
        useUnifiedTopology: true
      }
   )
   mongoose.connection.once('open', () => {
       console.log('Connected to db...')
   })
}