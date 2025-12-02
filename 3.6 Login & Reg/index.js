const express = require('express')
const chalk = require('chalk')
const port = 3000
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const auth = require('./middlewares/auth')

const {addRequest, getRequests} = require('./controllers/notes-controller')
const { addUser, loginUser } = require('./controllers/user-controller')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.urlencoded({
  extended: true
}))

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.json())
app.use(cookieParser())

app.get ('/register', async (req, res)=>{
  res.render('register', {
    title: 'Express app',
    error: undefined
  })
})


app.post ('/register', async (req, res)=>{
  const email = req.body.email
  const password = req.body.password
  try {
    await addUser(email,password)
    res.redirect('/login')
  } catch (e) {
    console.log('Registration error', e)
    if(e.code === 11000) {
      res.render('register', {
      title: 'Express app',
      error: 'Email already registered'
    })
    }
    res.render('register', {
      title: 'Express app',
      error: e.message
    })
  }
})
app.use((req, res, next) => {
  res.locals.isAuth = !!req.cookies.token;
  next();
});
app.get ('/login', async (req, res)=>{
  res.render('login', {
    title: 'Express app',
    error: undefined
  })
})

app.post('/login', async (req,res) =>{
  const email = req.body.email
  const password = req.body.password
  try {
    const token = await loginUser(email,password)
    res.cookie('token', token,{httpOnly:true})
    res.redirect('/')
  } catch (e){
    res.render('login', {
    title: 'Express app',
    error: e.message,
  })
  }
})

app.get('/logout', (req,res)=>{
  res.cookie('token','',{httpOnly:true})
  res.redirect('/')
})

app.get  ('/', async (req, res)=>{
  res.render('index', {
    title: 'Appointment app',
    error: false,
    success: req.query.success === 'true'
  })
})

app.post('/', async (req,res) =>{

  try{
    res.redirect('/?error=false')
  } catch(e) {
    res.redirect('/?error=true')
    console.log(e)
  }
})

app.get  ('/form', async (req, res)=>{
  res.render('form', {
    title: 'Appointment app',
    error: false,
    success: req.query.success === 'true'
  })
})

app.post('/form', async (req,res) =>{
  const name = req.body.name
  const phone = req.body.phone
  const description = req.body.description
  try{
    console.log('Received:', req.body);
    await addRequest(name,phone,description)
    res.redirect('/form?success=true')
  } catch(e) {
    console.log('Creation error', e)
    res.redirect('/?error=true')
    console.log(e)
  }
})
app.use(auth)

app.get  ('/requests', async (req, res)=>{
  
  res.render('requestTable', {
    title: 'Requests',
    requests: await getRequests(),
    error: false,
  })
})


mongoose.connect('mongodb+srv://sergeynov07_db_user:Qweasd11@cluster0.kvjr5su.mongodb.net/notes?appName=Cluster0')
  .then(async ()=>{
    app.listen(port,()=>{
      console.log(chalk.green(`Server has beeen started on port ${port}`))
    })
  })


  /*res.render('index',{
      title: 'Express app',
      notes: await getNotes(),
      error: false
    })

    res.redirect('/?error=false')
      
    */