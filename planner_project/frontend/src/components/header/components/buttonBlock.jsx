import { useNavigate } from "react-router"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoardAsync } from "../../../actions/create-board-async";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { CreateBoardModal } from "./createModal";
import { useSelector } from "react-redux";


export const ButtonBlock = ({menuId,handleMobileMenuOpen, handleProfileMenuOpen, mobileMenuId}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth);
  const [open,setOpen] = useState(false)
  const handleCreate = (title) =>{
      dispatch(createBoardAsync(title));
  }

  return(
    <div>
      <Box sx={{ flexGrow: 1,display:"flex", alignItems:"center"}}>
            <Button onClick={()=>setOpen(true)} disabled={!isAuth} variant="contained" startIcon={<AddOutlinedIcon/>}>Create</Button>
            <CreateBoardModal open={open} onClose={() => setOpen(false)} onSubmit={handleCreate} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex', } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="info about app"
              aria-haspopup="true"
              color="inherit"
              onClick={()=>navigate("/about")}
            >
              <InfoOutlinedIcon  />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          {/*для маленьких экранов */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          </Box>
    </div>
  )
}