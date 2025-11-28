const express = require('express')
const chalk = require('chalk')
const port = 3000
const path = require('path')
const {addNote, getNotes,remove, updateNote} = require('./notes-controller')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.urlencoded({
  extended: true
}))

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.json())

app.get  ('/', async (req, res)=>{
  res.render('index', {
    title: 'Express app',
    notes: await getNotes()
  })
})

app.post('/', async (req,res) =>{
  await addNote(req.body.title)
  res.redirect('/')
})

app.delete('/:id', async (req, res) => {
  const id = req.params.id
  await remove(id)
  res.render('index', {
    title: 'Express app',
    notes: await getNotes()
  })
})

app.put('/:id', async (req,res)=>{
  const id = req.params.id
  const{ title} = req.body
  await updateNote(id,title)
  res.render('index', {
    title: 'Express app',
    notes: await getNotes()
  })
})

app.listen(port,()=>{
  console.log(chalk.green(`Server has beeen started on port ${port}`))
})