require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const mapUser = require('./helpers/mapUser')
const mapColumn = require('./helpers/mapColumn')
const mapBoard = require('./helpers/mapBoard')
const mapTask = require('./helpers/mapTask')
const cors = require('cors')
const{ register, login} = require('./controllers/userController')
const auth = require('./middleware/auth')
//const hasRole = require('./middlewares/hasRole')
//const ROLES = require('./constants/roles')

const {createBoard, updateBoard, getBoard, getBoards, deleteBoard} = require('./controllers/boardController')
const { addColumn, deleteColumn, updateColumn } = require('./controllers/columnController')
const {addTask, deleteTask, updateTask, getAllTasks} = require('./controllers/taskController')

const port = 3001

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // фронт
  credentials: true,               
}));
app.use(express.json())
app.use(cookieParser())


app.post('/register', async (req,res)=>{
  console.log(req.body)
  try{
    const {user,token} = await register(req.body.login,req.body.password)

    res.cookie('token', token, {httpOnly:true})
      .send({error: null, user: mapUser(user)})
    
  } catch (e) {
    res.send({error: e.message || 'Unknown error'})
  }
})

app.post('/login', async (req,res)=>{
  
  try{
    
    const {user,token} = await login(req.body.login,req.body.password)

    res.cookie('token', token, {httpOnly:true})
      .send({error: null, user: mapUser(user)})
      
    
  } catch (e) {
    res.send({error: e.message || 'Unknown error'})
  }
})

app.post('/logout', async (req,res)=>{
  res
      .clearCookie('token', { httpOnly: true })
      .json({ data: true })
})


app.get('/auth', auth, (req, res) => {
  res.send({
    data: { user: mapUser(req.user)}
  });
});

app.use(auth)


//create board
app.post('/boards', async (req,res)=>{

  const { title } = req.body;
    if (!title) throw new Error('Title is required');
    const newBoard = await createBoard( req.user.id, {title  })
  res.send({data: mapBoard(newBoard)})
})

//get all boards
app.get('/boards', async (req,res)=>{

  const boards = await getBoards(req.user.id, req.query.search)
  res.send({data: {boards: boards.map(mapBoard)}})
})

//get one board
app.get('/boards/:id', async (req,res)=>{
  const{ board, columns, tasks }= await getBoard(req.params.id)
  const boardId = req.params.id;
  if(!boardId) return res.status(400).json({ error: 'Board ID is required' });
  if(board.userId.toString() !== req.user.id) {
    throw new Error('Access denied')
  }
  res.send({data:{board: mapBoard(board), columns: columns.map(mapColumn), tasks: tasks.map(mapTask) }})
})

// update board
app.patch('/boards/:id', async (req,res)=>{
  const updatedBoard = await updateBoard(req.user.id, req.params.id,{title: req.body.title})

  res.send({data: mapBoard(updatedBoard)})
})

// delete board
app.delete('/boards/:id', async (req,res)=>{
  await deleteBoard(req.user.id,req.params.id)
  res.send({error:null})
})

//columns
app.post('/boards/:id/columns', async (req,res)=>{
  const { title } = req.body;
  const boardId = req.params.id;
  const userId = req.user.id;
const newColumn = await addColumn(userId, boardId, {title:req.body.title, order: req.body.order})
res.send({data: mapColumn(newColumn)})
})

app.patch('/columns/:id', auth, async (req, res) => {
    const updatedColumn = await updateColumn(req.user.id, req.params.id, { 
      title: req.body.title,
      order: req.body.order
    });
    res.send({data: mapColumn(updatedColumn)})
  })


app.delete('/columns/:id', async (req,res)=>{
  await deleteColumn(req.user.id,req.params.id)
  res.send({error:null})
})


//tasks

app.get('/tasks',  auth, async (req, res) => {
  try {
    const allTasks = await getAllTasks(req.user.id)
    res.send({
      data: allTasks.map(mapTask)
    });
  } catch (err) {
    console.error('GET /tasks error', err);
    res.status(500).send({ error: err.message });
  }
});

app.post('/columns/:columnId/tasks', async (req,res)=>{
  const { columnId } = req.params;
  const userId = req.user.id;
  const { title, order } = req.body;
  const newTask = await addTask(userId, columnId, {title, order})
  res.send({data: mapTask(newTask)})
})


app.patch('/tasks/:id', auth, async (req, res) => {
    const { title, order, columnId } = req.body;
    const updatedTask = await updateTask(req.user.id, req.params.id, { 
      title,
      order,
      columnId
    });
    
    res.send({data: mapTask(updatedTask)})
  })

app.delete('/tasks/:id', async (req,res)=>{
  await deleteTask(req.params.id,req.user.id)
  res.send({error:null})
})


mongoose.connect('mongodb+srv://sergeynov07_db_user:Qweasd11@cluster0.kvjr5su.mongodb.net/planner?appName=Cluster0')
  .then(async ()=>{
    app.listen(port, ()=>{
      console.log(`Server has beeen started on port ${port}`)
    })
  })