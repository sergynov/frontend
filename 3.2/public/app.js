
document.addEventListener('click', event => {
  if(event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    remove(id)
    .then(()=>{
      event.target.closest('li').remove()
    })
  }

  if(event.target.dataset.type === 'edit'){
    const id = event.target.dataset.id
    const oldTitle = event.target.dataset.title
    const newTitle = prompt('New note', oldTitle)
    if(newTitle===null) {
      return
    }
    updateNote(id,newTitle) 
      .then(()=>{
        event.target.closest('li').querySelector('.note-title').textContent = newTitle
        event.target.dataset.title = newTitle
      })
  }
})

const remove = async (id) => {
  await fetch(`${id}`, {method: 'DELETE'})
}

const updateNote = async (id,title) => {
  await fetch(`${id}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json; charset=utf-8'},
    body: JSON.stringify({title})
  })
  
}