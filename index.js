require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const DB = require('./config/env');
const userRoutes = require('./routes/user');
const tokenRouter = require('./routes/token');
const noteRouter = require('./routes/note');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

//DB
DB();
//CORS
//buraya origin gelmezse, gelirse var mı yok mu kontrolü ekleyebilirim.
const allowedOrigins = ['http://localhost:3001'];
const corsOptions = {
   origin: allowedOrigins,
   credentials: true,
   maxAge: 30 * 24 * 60 * 60,
   methods: ['GET', 'POST'],
   allowedHeaders: ['Content-Type', 'Authorization'],
};
//cors opitonsları kendimiz manuel sekilde ayarlayabiliriz
//bunu ekleyebilirim.
app.use(cors(corsOptions));
//LOGGER
const LOGGER = require('./utils/logger');
LOGGER.createLogger();
app.use(express.json());
//HELMET
app.use(helmet());
//ROUTERS
app.use('/user', userRoutes);
app.use('/token', tokenRouter);
app.use('/note', noteRouter);
//PORT
app.listen(PORT, () => {
   console.log(`@@@@@@@@@@@@@@ -> PORT: ${PORT}`)
})