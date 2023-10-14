import express from  'express'
import cors from  'cors';
import cookieParser from  'cookie-parser';
import {config} from  'dotenv'
import morgan from 'morgan';
import userRoutes from './routes/user.router.js'
import errorMiddleware from './middlewares/error.middleware.js';
config()

// import  app from express ;
const app = express()

app.use(express.json())

// cors is a mechanism that allows web browsers to request resources from different origins
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
}));

// it is use for parse the token
app.use(cookieParser())

//morgan show in console-- what's the user trying to use(url)
app.use(morgan('dev'))

//set a default routes to '/api/v1/user' and mapped it with userRoutes which is in routes folder
app.use('/api/v1/user', userRoutes)

app.use('/', (req, res)=>{
    res.send('Home page')
});

//this default route is set for error handling
app.all('*', (req, res)=>{
    res.status(404).send("OOPS!!! 404 PAGE NOT FOUND!")
});

//this is a middleware for error, it captures all the error here.
app.use(errorMiddleware)

// routes of all 3 modules


//exporting app
export default app;
