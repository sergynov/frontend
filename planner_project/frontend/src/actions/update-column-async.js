import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { updateColumn } from "./update-column";

export const updateColumnAsync = (columnId,data) => async (dispatch) => {
  try {
    const res = await request(`${URL}/columns/${columnId}`, 'PATCH', data)
    dispatch(updateColumn(res.data))
  } catch (e) {
    throw new Error(e);
  }
}