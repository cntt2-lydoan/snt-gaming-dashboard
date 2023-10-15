import React, { createContext, useContext, useState} from 'react'
import { IAuthUser, IUserInfo} from '../types'

export const AuthContext = createContext<IAuthUser>(null!)
export const AuthProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>(null!)
  // Set the initial value for userInfo as null. When finishing call the API, if return an error, then I will set empty,
  // or if return data, then I will set data for userInfo. It helps me distinguish when the getting user/me API is done.
  // Because the userInfor type is declared as IUserInfor, but I want to set it as null in the first time, so I use '!'
  const [loading, setLoading] = useState(false)

   return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('authContext must be used within a AuthProvider')
  }

  return context
}
