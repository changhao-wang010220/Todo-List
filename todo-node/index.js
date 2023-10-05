const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3002;;
const db = require('./src/config/db');
const Task = require('./src/app/taskSchema');
// const User = require('./src/app/userSchema');

//获取静态资源的中间件，可以通过请求获得public文件夹下面的文件
app.use(express.static(path.join(__dirname, "src/public")));
//生成日志中间件
app.use(morgan("combined"));
//接受表单中间件
app.use(express.urlencoded({extended: true}));
//接受json body的中间件，通过调用req.body获得
app.use(express.json());
//跨域
app.use(cors([
    {origin: "http://localhost:3000"}
]))

//connect mongoDB
db.connect();

app.get('/', async (req, res) => {
  res.send("NODE")
});

//Task---------------------------------------------------------------------------------
app.get('/api/tasks', async (req, res) => {

  try {
    const taskDoc = await Task.find({});
    res.json(taskDoc);
  } catch (error) {
    res.status(500).json(error);
  }

});

app.post('/insert-task', async (req, res) => {
  const task = new Task(req.body);
  console.log(task);
  task.dateTime = new Date();
  await task.save()
    .then(() => res.json("success insert"))
    .catch(e => {
      console.log(e)
      res.status(500).json({e})
    });
});

app.post('/update-task', async (req, res) => {
  const task = req.body;
  await Task.updateOne({_id: req.body._id}, task)
    .then(() => res.json('success update'))
    .catch(e => res.status(500).json({e}));
});

app.post('/delete-task', async (req, res) => {
  const id = req.body._id;

  await Task.deleteOne({_id: id})
    .then(() => res.json('success delete'))
    .catch(e => res.status(500).json({e}));
});

app.post('/deleteALL-task', async (req, res) => {
  await Task.deleteMany({})
    .then(() => res.json("success delete all"))
    .catch(e => res.status(500).json({e}));
});

//User---------------------------------------------------------------------------------

// app.get('/api/users', async (req, res) => {

//   try {
//     const userDoc = await User.find({});
//     res.json(userDoc);
//   } catch (error) {
//     res.status(500).json(error);
//   }

// });

// app.post('/insert-user', async (req, res) => {
//   const user = new User(req.body);
//   await user.save()
//     .then(() => res.redirect(''))
//     .catch(e => res.status(500).json({e}));
// });

// app.post('/update-user', async (req, res) => {
//   const user = req.body;

//   await User.updateOne({_id: req.body._id}, user)
//     .then(() => res.redirect(''))
//     .catch(e => res.status(500).json({e}));
// });

// app.post('/delete-user', async (req, res) => {
//   const id = req.body._id;

//   await User.deleteOne({_id: id})
//     .then(() => res.redirect(''))
//     .catch(e => res.status(500).json({e}));
// });

// app.post('/deleteALL-user', async (req, res) => {
//   await User.deleteMany({})
//     .then(() => res.redirect(''))
//     .catch(e => res.status(500).json({e}));
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});