import React, { createContext, useState } from "react"

type contextType = {
    isLoggedIn : boolean,
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>
}

export const tokenContext = createContext<contextType>({ isLoggedIn: false, setIsLoggedIn: () => {},})

const TokenContextProvider = ({children}:{children:React.ReactNode}) => {

const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token")!=null)
  return <>
  <tokenContext.Provider value={{isLoggedIn , setIsLoggedIn}}>
    {children}
  </tokenContext.Provider>
  </>
}

export default TokenContextProvider
