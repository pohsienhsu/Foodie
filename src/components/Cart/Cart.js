import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import styles from './Cart.module.css';


const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const orderHandler = () => {
    setIsCheckout(true);
  }

  const cancelCheckoutHandler = () => {
    setIsCheckout(false);
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://foodie-51cec-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items
        })
      });
      if (!response.ok) {
        throw Error('Fail to submit order!');
      }
    } catch (err) {
      console.log(err);
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItems();
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

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
      {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <ul className={styles['cart-itmes']}>
        {cartItems}
      </ul>
      <div className={styles.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={cancelCheckoutHandler} onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Submitting order details ...</p>;
  const didSubitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles['button']} onClick={props.onHideCart}>Close</button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubitModalContent}
    </Modal>
  )
}

export default Cart;