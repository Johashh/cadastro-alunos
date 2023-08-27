const express = require('express');
const app = express();
const studentRouter = require('./routes/studentRoutes');
const teacherRouter = require('./routes/teacherRoutes');
const classroomRouter = require('./routes/classroomRoutes');
const resourceRouter = require('./routes/resource');


app.use(express.json());
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/classroom', classroomRouter);
app.use('/resource', resourceRouter);

app.listen(3000);