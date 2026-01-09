import { request } from "../components/utils/server-request"
import { deleteBoard } from "./delete-board"
import { URL } from "../constants/url"

export const deleteBoardAsync = (boardId) => async (dispatch) => {
  await request(`${URL}/boards/${boardId}`, 'DELETE')
  dispatch(deleteBoard(boardId))
}