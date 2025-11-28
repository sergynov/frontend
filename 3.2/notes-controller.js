const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')


async function addNote (title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString()
  }
  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.green('note was added'))
}


async function getNotes () {
  const notes = await fs.readFile(notesPath,{encoding:'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function remove (idToRemove) {
  const notes = await getNotes()

  const filteredNotes = notes.filter(note => note.id !== idToRemove)

  if (filteredNotes.length === notes.length) {
  console.log(chalk.red('Note not found'));
  return;
}

  await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
  console.log(chalk.bgCyanBright('note was removed'))
}

async function updateNote (id,title) {
  const notes = await getNotes()
  const updated = notes.map(note => {
    if (note.id === id) {
      return { ...note, title }
    }
    return note
  })
  await fs.writeFile(notesPath, JSON.stringify(updated))
}

async function printNotes () {
  const notes = await getNotes()
  console.log(chalk.white('Here is the list of all notes:'))
  notes.forEach(note => {
    console.log(chalk.cyanBright('id:',note.id),chalk.cyanBright(note.title))
  });
}

module.exports = {
  addNote, printNotes, remove, getNotes, updateNote
}