const express = require('express');
const app = express();
const studentRouter = require('./routes/studentRoutes');
const teacherRouter = require('./routes/teacherRoutes');


app.use(express.json());
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);

app.listen(3000);