

export const CurrentDate = () => {
  
  return(
    <div>
    {new Date().toLocaleString('en',{day:'numeric', month:'long'})}
  </div>
  )
}