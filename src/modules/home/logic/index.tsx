
import React, { createContext, useContext, useState } from 'react'
import { IHomeContextProps } from '../type'

export const HomeContext = createContext<IHomeContextProps>(null!)

export const HomeProvider: React.FC = ({ children }) => {
  const [title, setTitle] = useState('')

  return (
    <HomeContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

export default function useHomeContext() {
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeProvider')
  }

  return context
}