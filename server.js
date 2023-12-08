import express, { json } from 'express'
const app = express()
app.use(json())
import { resolve ,dirname } from 'path'
import userRoute from './routes/usersRoute.js'
import transactionsRoute  from './routes/transactionsRoute.js'
import { fileURLToPath } from 'node:url';
// import { connect, connection as _connection } from 'mongoose'
// const mongoose = require("mongoose");
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
mongoose
.connect('mongodb+srv://supriyakumari82982:Supriya@cluster0.vcsphac.mongodb.net/xpense-tracker' , {useNewUrlParser : true , useUnifiedTopology : true})
  .then(() => {
    console.log("Mongo DB connection successful");
  })
  .catch((err) => console.log(err));

// const connection = _connection

// connection.on('error', err => console.log(err))

// connection.on('connected' , () => console.log('Mongo DB Connection Successfull'))

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/api/users/' , userRoute)
app.use('/api/transactions/' , transactionsRoute)

const port =process.env.PORT || 5001

if(process.env.NODE_ENV === 'production')
{
    //  app.use('/' ,('client/build'))
    //  app.use('/static', express.static( 'client/build/static'))

    //  app.get('/' , (req, res)=>{
    //      res.sendFile(resolve(__dirname, 'client/build/index.html'))
    //  })
    try{
      app.use(express.static("client/build"))

      app.get("* ", (req, res) => {
        // res.send('Hi');
        res.sendFile(resolve(__dirname, "client", "build", "index.html"))
      });

    }
    catch(err){
      console.log(err);
    }
    // app.use(express.static("client/build"))

    // app.get("* ", (req, res) => {
    //   // res.send('Hi');
    //   res.sendFile(resolve(__dirname, "client", "build", "index.html"))
    // });
}



app.listen(port, () => console.log(`Node JS Server started at port ${port}!`))