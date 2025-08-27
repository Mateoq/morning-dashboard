import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';

import { Paper, Spinner } from '../ui';
import { useGeoContext } from '@/context/geo-context';
import { getWeather } from '@/services';
import { Weather } from '@/types';
import classes from './WeatherInfo.module.css';

interface WeatherInfoDetailsProps {
  data: Weather;
}

const WeatherInfoDetails = ({ data }: WeatherInfoDetailsProps) => {
  return (
    <motion.div
      key="weather-info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.2 }}
      exit={{ opacity: 0 }}
      className={classes.weatherInfo}
    >
      <p className={classes.weatherInfoCondition}>
        {data.current.condition.text}
      </p>
      <div className={classes.weatherInfoDetails}>
        <Image
          src={`https:${data.current.condition.icon}`}
          alt={data.current.condition.text}
          width={100}
          height={100}
        />
        <span className={classes.weatherInfoC}>{data.current.temp_c}°C</span>
      </div>
      <p className={classes.weatherInfoLocation}>
        {data.location.name}, {data.location.country}
      </p>
    </motion.div>
  );
};

export const WeatherInfo = () => {
  const geo = useGeoContext();
  const { data, isLoading } = useQuery({
    queryKey: ['weather', geo?.lat, geo?.lon],
    queryFn: async () => {
      if (!geo) return null;
      return getWeather(geo.lat, geo.lon);
    },
    enabled: !!geo,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <Paper>
      <div className={classes.container}>
        <AnimatePresence>
          {isLoading || !geo || !data ? (
            <motion.div
              key="spinner-weather"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className={classes.spinnerContainer}
            >
              <Spinner />
            </motion.div>
          ) : (
            <WeatherInfoDetails data={data} />
          )}
        </AnimatePresence>
      </div>
    </Paper>
  );
};
