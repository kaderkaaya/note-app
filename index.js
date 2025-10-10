require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const DB = require('./config/env');
const userRoutes = require('./routes/user');
const tokenRouter = require('./routes/token');
const app = express();
DB();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/token', tokenRouter);
app.listen(PORT, () => {
   console.log(`@@@@@@@@@@@@@@ -> PORT bağlantısı okkkk!!!!${PORT}`)
})