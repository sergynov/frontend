import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { setBoard } from "./set-board";

export const fetchBoard = (boardId) => async (dispatch) => {
  try {
    const res = await request(`${URL}/boards/${boardId}`, 'GET',)
    dispatch(setBoard(res.data))
  } catch (e) {
    throw new Error(e);
  }
}