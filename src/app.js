const express = require('express');
const app = express();
const studentRouter = require('./routes/studentRoutes');
const teacherRouter = require('./routes/teacherRoutes');
const classroomRouter = require('./routes/classroomRoutes');


app.use(express.json());
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/classroom', classroomRouter);

app.listen(3000);