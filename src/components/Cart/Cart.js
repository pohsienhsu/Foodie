import React, {useContext} from 'react';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';

import styles from './Cart.module.css';


const Cart = (props) => {

  const cartCtx = useContext(CartContext);

  const cartItems = cartCtx.items.map((item) => {
    return <li>{item.name} {item.price * item.amount}</li>
  });

  return (
    <Modal onClose={props.onHideCart}>
      <ul className={styles['cart-itmes']}>
        {cartItems}
      </ul>
      <div className={styles.total}>
        <span>Total Amount:</span>
        <span>{cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  )
}

export default Cart;