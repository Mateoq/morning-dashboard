import { PropsWithChildren } from 'react';
import classes from './Paper.module.css';

export const Paper = ({ children }: PropsWithChildren) => {
  return (
    <div className={classes.paper}>
      {children}
    </div>
  );
};
