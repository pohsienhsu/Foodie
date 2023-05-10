import React, { useEffect, useState, useCallback } from 'react';
import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';

import styles from './AvailableMeals.module.css';


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://foodie-51cec-default-rtdb.firebaseio.com/meals.json");
      if (!response.ok) {
        throw Error('Fail to retrieve available meals');
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }
      console.log(loadedMeals)
      setMeals(loadedMeals);
    } catch(err) {
      console.log(err)
      setError(err.message);
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    )
  })

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {error && <p>{error}</p>}
          {isLoading && !error && <p>Loading ...</p>}
          {!isLoading && !error && mealsList}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals