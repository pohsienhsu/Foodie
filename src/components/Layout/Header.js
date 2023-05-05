import React from 'react';
import HeaderCartButton from './HeaderCartButton';

import styles from "./Header.module.css";

import mealsImg from '../../assets/meals.jpeg';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Foodie</h1>
        <HeaderCartButton />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImg} alt="table full of tasty food"/>
      </div>
    </React.Fragment>
  )
}

export default Header;