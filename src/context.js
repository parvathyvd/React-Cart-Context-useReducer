import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()
const initState = {
  loading: false,
  cart : cartItems,
  amount: 0,
  total : 0,
}



const AppProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer,initState)

  const clearCart = () => {
    return dispatch({type : 'CLEAR_CART'})
  }

  const removeItem = (id) => {
    return dispatch({type: 'REMOVE_ITEM',payload : id})
  }

  const increase = (id) => {
    dispatch({type: 'INCREASE_ITEM' , payload: id})
  }

  const decrease = (id) => {
    dispatch({type: 'DECREASE_ITEM' , payload: id})
  }

  useEffect(()=>{
    dispatch({type:'GET_TOTAL'})
  },[state.cart])


  return (
    <AppContext.Provider
      value={{...state, clearCart, removeItem, increase, decrease}}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
