import { useStore } from "react-redux";
import { useEffect } from "react";

export const useResetForm = (reset) => {
  const store = useStore()

    useEffect(() => {
    return store.subscribe(() => {
      const { isAuth } = store.getState().user;
      if (!isAuth) reset();
    });
  }, [reset, store]);
}
