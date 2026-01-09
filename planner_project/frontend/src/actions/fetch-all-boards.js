import { URL } from "../constants/url";
import { setBoards } from "./set-boards";
import { request } from "../components/utils/server-request";

export const fetchAllBoards = () => async (dispatch) => {
  try {
    const res = await request(`${URL}/boards`, 'GET');
    dispatch(setBoards(res.data.boards)); // кладём массив досок в редюсер
  } catch (e) {
    console.error("Failed to fetch boards:", e);
  }
};