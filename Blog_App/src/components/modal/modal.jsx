import { Button } from "../button/button";
import { useSelector } from "react-redux";
import { selectModalIsOpen, selectModalOnCancel, selectModalOnConfirm, selectModalText } from "../../selectors";
import styled from "styled-components"

const ModalContainer = ({className}) => {
  const isOpen = useSelector(selectModalIsOpen)
  const text = useSelector(selectModalText)
  const onConfirm = useSelector(selectModalOnConfirm)
  const onCancel = useSelector(selectModalOnCancel)


  if(!isOpen) {
    return null;
  }

  return(
    <>
    <div className={className}>
      <div className="overlay">
      </div>
      <div className="box">
        <h3> {text}</h3>
        <div className="buttons">
          <Button width="120px" onClick={onConfirm} >Yes</Button>
          <Button width="120px" onClick={onCancel} >Cancel</Button>
        </div>
      </div>

    </div>
    </>
  )
}

export const Modal = styled(ModalContainer)`

  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  & .overlay {
    position: absolute;
    background-color: rgba(0,0,0,0.5) ;
    width: 100%;
    height: 100%;
  }
  & .box{
    position: relative;
    top: 50%;
    transform: translate(0,-50%);
    background-color: white;
    width: 400px;
    margin: auto;
    z-index: 30;
    border: 2px solid black;
    padding: 0 20px 20px;
    text-align: center;
  }
  & .buttons{
    display: flex;
    justify-content: center;
  }
  & .buttons button{
    margin: 0 5px;
  }
`;