import PropTypes from 'prop-types'
import { Icon } from "../../../components/header/components/icon"
import { TableRow } from "./tableRow";
import { useState } from "react";
import { useServerRequest } from "../../../hooks";
import styled from "styled-components"
import { PROP_TYPE } from '../../../../constants';

const UserRowContainer = ({className,id, login,registered_at, roleId:userRoleId, roles,onUserRemove}) => {


  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)
  const [initialRoleId, setInitialRoleId] = useState(userRoleId)
  
  const onRoleChange = ({target}) => {
    setSelectedRoleId(Number(target.value))
  }
  
  const requestServer = useServerRequest()

  const onRoleSave = (userId,newUserRoleId) => {
    requestServer('updateUserRole',userId,newUserRoleId)
      .then(()=>{
        setInitialRoleId(newUserRoleId)
      })
  }

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  return(
    <div className={className} >
            <TableRow>
              <div className="login-column">{login}</div>
              <div className="date-column">{registered_at}</div>
              <div className="role-column">
                <select value={selectedRoleId} onChange={onRoleChange} >
                  {roles.map(({id:roleId,name:roleName})=>(
                    <option key={roleId} value={roleId}>{roleName}</option>
                  ))}
                </select>
                <Icon margin="0 10px" size="22px" id="fa fa-floppy-o" disabled={isSaveButtonDisabled}
                  onClick={()=> onRoleSave(id, selectedRoleId) }/>
              </div>
            <Icon margin="0 10px" size="22px" id="fa fa-trash-o"
              onClick={onUserRemove}   />
              </TableRow>
    </div>
  )
}

export const UserRow = styled(UserRowContainer)`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  margin-top: 10px;

  & select {
    font-size: 17px;
    padding: 0.5px;
  }

`;
UserRow.propTypes = {
  id: PropTypes.string.isRequired, 
  login: PropTypes.string.isRequired,
  registered_at: PropTypes.string.isRequired, 
  roleId: PROP_TYPE.ROLE_ID.isRequired, 
  roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
  onUserRemove: PropTypes.func.isRequired
}