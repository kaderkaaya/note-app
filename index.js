require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const DB = require('./config/env');
const userRoutes = require('./routes/user');
const tokenRouter = require('./routes/token');
const logger = require('./utils/logger');
const app = express();
DB();
logger.createLogger();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/token', tokenRouter);
app.listen(PORT, () => {
   console.log(`@@@@@@@@@@@@@@ -> PORT:${PORT}`)
})