const express = require('express');
const app = express();
const router = require('./config/routes');

app.use(express.json());
app.use('/student', router);

app.listen(3000);