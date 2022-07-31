import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem.js";
import { useState, useEffect } from "react";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMeals = async () => {
    const response = await fetch(
      "https://react-http-529fc-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const mealsObj = await response.json();
    const meals = [];

    for (const key in mealsObj) {
      meals.push({ ...mealsObj[key], id: key });
    }

    const mealsList = meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));

    setMealsList(mealsList);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
