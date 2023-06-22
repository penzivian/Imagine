import express from 'express';
import * as dotenv from 'dotenv'
import 'express-async-errors';
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import authRoutes from './routes/authRoutes.js'
import checkLoginRoute from './routes/checkLoginRoute.js'
import likecommentRoute from './routes/likecommentRoute.js'

// import authenticateUser from './middlewares/authentication.js'
import notFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'

dotenv.config() // To get the access of dotenv files


const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'})) // For getting the req.body
// app.use(expressAsyncErrors()); // For error handling of async errors


// Routes
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E')
})
app.use('/api/v1/post', postRoutes) // Providing the base path to the routes
app.use('/api/v1/dalle', dalleRoutes) // Providing the base path to the routes
app.use('/api/v1', authRoutes) // Providing the base path to the routes
app.use('/api/v1', checkLoginRoute) // Providing the base path to the routes
app.use('/api/v1', likecommentRoute) // Providing the base path to the routes

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const startServer = async (req, res) => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, ()=> console.log('Server has started on port 8080'))
    } catch (error) {
        console.log(error);
    }

}

startServer()