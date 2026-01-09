import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { addColumn } from "./add-column";

export const addColumnAsync = (boardId,title) => async (dispatch,getState) => {
  try {
    const { columns } = getState().board;

    // берём максимальный order
    const maxOrder = columns.length
      ? Math.max(...columns.map(c => c.order))
      : -1;
    const res = await request(`${URL}/boards/${boardId}/columns`, 'POST',{title, order: maxOrder + 1})
    dispatch(addColumn(res.data))
  } catch (e) {
    throw new Error(e);
  }
}