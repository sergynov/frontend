const yargs = require('yargs/yargs')
const pkg = require('./package.json')
const {addNote, printNotes, remove} = require('./notes-controller')

//yargs.version(pkg.version)

const {hideBin} = require('yargs/helpers')



yargs(hideBin(process.argv))
  .command( {
    command: 'add',
    describe: 'Add new note to list',
    builder: {
      title: {
        type: 'string',
        describe: 'Note title',
        demandOption: true
      }
    },
    handler({title}) {
      addNote(title)
      console.log('was added', title)
    }
  })
  .command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
      const notes = await printNotes()
    }
  })
  .command({
    command:'remove',
    describe: 'remove a note',
    builder: {
      id: {
      type: 'string',    
      describe: 'Note ID to remove',
      demandOption: true
    }
    },
    async handler ({id}) {
      await remove(id)
    }
  })
  .parse()