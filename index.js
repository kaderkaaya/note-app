require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const DB = require('./config/env');
const userRoutes = require('./routes/user');
const tokenRouter = require('./routes/token');
const noteRouter = require('./routes/note');

const app = express();
DB();
const LOGGER = require('./utils/logger');
LOGGER.createLogger();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/token', tokenRouter);
app.use('/note',noteRouter);
app.listen(PORT, () => {
   console.log(`@@@@@@@@@@@@@@ -> PORT: ${PORT}`)
})