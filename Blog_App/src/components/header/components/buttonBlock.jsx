import styled from 'styled-components'
import { Icon } from './icon';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUserRole, selectUserLogin, selectUserSession } from '../../../selectors';
import { ROLE } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions';
import { checkAccess } from '../../../utils';

const UserLogin = styled.div `
    display: flex;
    justify-content: flex-end;
`;

const UserText = styled.div`
  font-size: 17px;
  margin-top: 5px;
  margin-left: 10px;
  font-weight: 500;
`;

const StyledIcon = styled.div`
display: flex;
justify-content: center;
`;
const HeaderButton = styled.button `
  height: 40px;
  padding: 10px;
  border: none;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {text-decoration: underline;}

`; 

const ButtonBlockContainer = ({className}) => {

  const roleId = useSelector(selectUserRole)
  const login = useSelector(selectUserLogin)
  const session = useSelector(selectUserSession)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout(session))
    sessionStorage.removeItem('userData')
  }

  const isAdmin = checkAccess([ROLE.ADMIN], roleId)

  return(
  <div className={className}>
    {isAdmin && (
      <>
        <Link to="post">
          <HeaderButton>New Post</HeaderButton>
        </Link>
        <Link to="users">
          <HeaderButton>Users</HeaderButton>
        </Link>
    </>
    )}
      
      <UserLogin>
        {roleId === ROLE.GUEST ? 
        <>
        <HeaderButton>
        <Link to="login">Log In</Link> 
        <Icon margin="0 10px" size="21px" id="fa-user-circle"  ></Icon>
        </HeaderButton> </>
        : 
        <>
        <StyledIcon  >
          <UserText>{login}</UserText>
          <HeaderButton onClick={ onLogout }>
            <Icon margin="0 10px" size="22px" id="fa fa-sign-out"  ></Icon>
          </HeaderButton>
        </StyledIcon>
        </>}
        
      
      
    </UserLogin>
  </div>
  )
}

export const ButtonBlock = styled(ButtonBlockContainer)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;