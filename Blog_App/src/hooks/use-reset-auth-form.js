import { useStore } from "react-redux";
import { useEffect } from "react";

export const useResetForm = (reset) => {
  const store = useStore()

  return(
    useEffect(()=>{
    let currentWasLogout = store.getState().app.wasLogout;
    return  store.subscribe(()=>{
      let previousWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;
      if(currentWasLogout !== previousWasLogout) {
        reset()
      }
    });
  },[reset,store])
  )
}