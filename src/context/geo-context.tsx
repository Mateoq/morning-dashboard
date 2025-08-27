import { createContext, useContext } from 'react';

import { Geo } from '@/types';

export const GeoContext = createContext<Geo | null>(null);

export const useGeoContext = () => useContext(GeoContext);
