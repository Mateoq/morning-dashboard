import { AnimatePresence, motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';

import { Paper, Spinner } from '../ui';
import { getQuoteOfTheDay } from '@/services';

import classes from './QuoteOfTheDay.module.css';

export const QuoteOfTheDay = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['quoteOfTheDay'],
    queryFn: getQuoteOfTheDay,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <Paper>
      <div className={classes.container}>
        <AnimatePresence>
          {isLoading || data == null ? (
            <motion.div
              key="spinner-weather"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className={classes.spinnerContainer}
            >
              <Spinner />
            </motion.div>
          ) : (
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className={classes.quote}>&quot;{data.quote}&quot;</p>
              <footer className={classes.quoteAuthor}>
                <cite>{data.author}</cite>
              </footer>
            </motion.blockquote>
          )}
        </AnimatePresence>
      </div>
    </Paper>
  );
};
