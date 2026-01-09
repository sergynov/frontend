import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { updateBoard } from "./update-board";

export const updateBoardAsync = (boardId,data) => async (dispatch) => {
  try {
    const res = await request(`${URL}/boards/${boardId}`, 'PATCH', data)
    dispatch(updateBoard(res.data))
  } catch (e) {
    throw new Error(e);
  }
}