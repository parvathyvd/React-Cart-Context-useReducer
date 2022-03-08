const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART'){
        return {...state, cart: []}
    }
    if(action.type === 'REMOVE_ITEM'){
        let newCart = state.cart.filter(item => action.payload !== item.id)
        return{...state, cart: newCart}
    }
    if(action.type === 'INCREASE_ITEM'){
    // state.amount needs to be increased 
    let newCart = state.cart.map((item) => {
            if(action.payload === item.id){
                return {...item, amount: item.amount + 1}
            }
        return item
     })
        return {...state, cart: newCart}
    }
 
    if(action.type === 'DECREASE_ITEM'){
        let newAmount = state.cart.map((item) => {
            if(item.id === action.payload){
                return {...item, amount: item.amount -1}
            }
            return item
        }).filter((it) => it.amount !== 0)
        return {...state, cart: newAmount}
    }

    if(action.type === 'GET_TOTAL'){
        let {total, amount} = state.cart.reduce((cartTotal, cartItem)=>{
            const {price, amount} = cartItem;
            const itemTotal = price *amount;
            cartTotal.amount += amount
            cartTotal.total  += itemTotal
            return cartTotal
        },{
            total :0,
            amount: 0
        })
        total = parseFloat(total.toFixed(2))
        return{...state, total,amount}
    }
    return state;  

}

export default reducer