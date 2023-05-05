import React from 'react';

import styles from "./Header.module.css";

import mealsImg from '../../assets/meals.jpeg';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Foodie</h1>
        <button>Cart</button>
      </header>
      <div>
        <img src={mealsImg} />
      </div>
    </React.Fragment>
  )
}

export default Header;