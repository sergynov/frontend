export const requestAddTask = (title,body) => async(dispatch)=>{
    const res = await fetch('http://localhost:3000/list', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({
        title,
        body
      })
    })
    const data = await res.json();
    dispatch({type: 'TASKS/ADD', payload: data})
}

export const requestRemoveTask = (id)=> async(dispatch)=> {
    const res = await fetch(`http://localhost:3000/list/${id}`, {
      method: 'DELETE',
    })
    dispatch({type:'TASKS/REMOVE', payload:id})
  }

  export const requestChangeTask = (id, title, body) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:3000/list/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ title, body }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    // обновляем задачу в Redux
    dispatch({ type: 'TASKS/UPDATE', payload: data });

    // закрываем модалку
    dispatch({ type: 'DISPLAY/TOGGLE_MODAL', payload: false });

    // сбрасываем форму
    dispatch({ type: 'FORM/SET_TITLE', payload: '' });
    dispatch({ type: 'FORM/SET_BODY', payload: '' });
    dispatch({ type: 'FORM/CLEAR' });

  } catch (error) {
    console.error('Ошибка изменения задачи:', error);
  }
};

export const loadTodos = () => async(dispatch) => {
  dispatch({type:'TASKS/LOAD_START'})
  try {
    const res = await fetch('http://localhost:3000/list')
    const data = await res.json()
    dispatch({type:'TASKS/LOAD_SUCCESS', payload: data})
  } catch (error) {
    dispatch({type:'TASKS/LOAD_ERROR', payload:error.message})
  }
}