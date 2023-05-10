import React from 'react';

import styles from './Checkout.module.css';

const Checkout = (props) => {

  const confirmHandler = (event) => {
    event.preventDefault();
    console.log('confirmed!');
  }

  return (
    <form onSubmit={confirmHandler}>
      <div className={styles.control}>
        <label htmlFor='name'>Your Name</label>
        <input id='name' type='text'/>
      </div>
      <div className={styles.control}>
        <label htmlFor='street'>Street</label>
        <input id='street' type='text'/>
      </div>
      <div className={styles.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input id='postal' type='text'/>
      </div>
      <div className={styles.control}>
        <label htmlFor='city'>City</label>
        <input id='city' type='text'/>
      </div>
      <button type="button" onClick={props.onCancel}>Cancel</button>
      <button>Confirm</button>
    </form>
  )
}

export default Checkout;