import styled from "styled-components";
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { setSearchQuery } from "../../../reducers";
import { selectSearchQuery, selectFilteredTasks} from "../../../selectors";

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 40px;
  z-index: 11;
`

const Input = styled.input`
  width: 260px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  outline: none;
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 10;
`

const Results = styled.div`
  position: absolute;
  top: 40px;
  width: 420px;
  background: #fff;
  border-radius: 8px;
  z-index: 11;
  max-height: 400px;
  overflow-y: auto;
`

const Item = styled.div`
  padding: 10px 16px;
  cursor: pointer;

  &:hover {
    background: #f2f2f2;
  }
`;
  
const SearchContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth);
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const filteredTasks = useSelector(selectFilteredTasks);
  const query = useSelector(selectSearchQuery);

  const handleChange = e => dispatch(setSearchQuery(e.target.value));


  // закрытие по клику вне
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false),
        dispatch(setSearchQuery(''))
      }
    }

    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open,dispatch])

  return (
    <>
      {open && <Overlay />}
      <SearchWrapper ref={ref}>
        <SearchIcon />
        <Input
          disabled={!isAuth}
          placeholder="Search tasks..."
          value={query}
          onFocus={() => setOpen(true)}
          onChange={handleChange}
        />

        {open && filteredTasks.length > 0 && (
          <Results>
            {filteredTasks.slice(0,5).map(task => {
              const boardId = task.boardId
              return(
              <Item
                key={task.id}
                onClick={() => {
                  navigate(`/boards/${boardId}`)
                  setOpen(false)
                  dispatch(setSearchQuery(''))
                }}
              >
                {task.title}
              </Item>
              ) 
              })}
          </Results>
        )}
      </SearchWrapper>
    </>
  )
}


export const HeaderSearch = styled(SearchContainer)``;