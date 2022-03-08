import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

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

  const fetchItems = async() => {
      dispatch({type: 'LOADING'})
      const response = await fetch(url);
      const result = await response.json();
      dispatch({type : 'GET_ITEMS',payload : result})
  }

  useEffect(()=>{
    dispatch({type:'GET_TOTAL'})
  },[state.cart])

  useEffect(()=>{
    fetchItems()
  },[])


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

 

  return (
    <AppContext.Provider
      value={{...state, clearCart, removeItem, increase, decrease}} >
      {children}
    </AppContext.Provider>
  )
}
 export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
