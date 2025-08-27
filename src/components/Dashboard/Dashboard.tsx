import { motion } from 'motion/react';

import { Hero } from '../ui';
import { WeatherInfo } from '../WeatherInfo/WeatherInfo';
import { QuoteOfTheDay } from '../QuoteOfTheDay/QuoteOfTheDay';

import classes from './Dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className={classes.container}>
      <Hero headline="Good Morning!" />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className={classes.cardsContainer}
      >
        <div className={classes.stackedCard}>
          <h3 className={classes.cardLabel}>Weather</h3>
          <WeatherInfo />
        </div>
        <div className={classes.stackedCard}>
          <h3 className={classes.cardLabel}>Quote of the Day</h3>
          <QuoteOfTheDay />
        </div>
      </motion.section>
    </div>
  );
};
