import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { deleteColumn } from "./delete-column";

export const deleteColumnAsync = (columnId) => async (dispatch) => {
  try {
    await request(`${URL}/columns/${columnId}`, 'DELETE')
    dispatch(deleteColumn(columnId))
  } catch (e) {
    throw new Error(e);
  }
}