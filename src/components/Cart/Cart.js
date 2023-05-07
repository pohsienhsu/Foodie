import React, {useContext} from 'react';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

import styles from './Cart.module.css';


const Cart = (props) => {

  const cartCtx = useContext(CartContext);
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item)
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  }


  const cartItems = cartCtx.items.map((item) => {
    return (
      <CartItem 
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onAdd={cartItemAddHandler.bind(null, item)}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
      />
    )
  });

  return (
    <Modal onClose={props.onHideCart}>
      <ul className={styles['cart-itmes']}>
        {cartItems}
      </ul>
      <div className={styles.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart;