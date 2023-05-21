require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB= require('./db/connect')
const bucketRouter = require('./routes/bucket')
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware  = require('./middleware/error-handler')

//security packages
const helmet = require('helmet')
const cors= require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//accepting json body data
app.use(express.json());

// extra security packages
app.set('trust proxy', 1) //since we use proxies

app.use(rateLimiter(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  }
))
app.use(helmet())
app.use(cors())
app.use(xss())


app.get('/', (req, res)=>{
 res.send('Hello there!!!')
})

app.use('/api/v1', bucketRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000;
const start = async ()=>{
 try{
  //CONNECT TO THE DATABASE
  await connectDB(process.env.MONGO_URI);
  console.log('Connect to the database!')
  app.listen(port, ()=>{
   console.log(`Server is listening on port ${port}.....`)
  })

 }
 catch(error){
  console.log(error)
 }
}


start();