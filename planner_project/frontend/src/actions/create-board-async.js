import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { createBoard } from "./create-board";


export const createBoardAsync = (title) => async (dispatch) => {
  try {
    const res = await request(`${URL}/boards`, 'POST', { title });
    console.log(res)
    dispatch(createBoard(res.data)); // добавляем в редюсер
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};