import { motion } from 'motion/react';

import classes from './Hero.module.css';

export interface HeroProps {
  headline: string;
}

export const Hero = ({ headline }: HeroProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={classes.container}
    >
      <h1 className={classes.headline}>{headline}</h1>
    </motion.section>
  );
};
