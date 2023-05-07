import React, {useReducer} from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = state.items.filter((item) => {
      return item.name !== action.item.name;
    }).concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'REMOVE_ITEM') {
    const deleteItem = state.items.find((item) => {
      return item.id === action.id;
    });
    if (!deleteItem) {
      return;
    }
    const updatedTotalAmount = state.totalAmount - (deleteItem.amount * deleteItem.price);
    const updatedItems = state.items.filter((item) => {
      return item.id !== action.id;
    });
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
}

const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item: item
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      id: id
    })
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;