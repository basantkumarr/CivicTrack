import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [radiusFilter, setRadiusFilter] = useState(3); // Default 3km radius

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(location);
        setLocationLoading(false);
        localStorage.setItem('civictrack_location', JSON.stringify(location));
      },
      (error) => {
        setLocationError(error.message);
        setLocationLoading(false);
        
        // Try to get stored location
        const storedLocation = localStorage.getItem('civictrack_location');
        if (storedLocation) {
          setUserLocation(JSON.parse(storedLocation));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const isWithinRadius = (issueLocation) => {
    if (!userLocation || !issueLocation) return false;
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      issueLocation.latitude,
      issueLocation.longitude
    );
    return distance <= radiusFilter;
  };

  const value = {
    userLocation,
    locationError,
    locationLoading,
    radiusFilter,
    setRadiusFilter,
    getCurrentLocation,
    calculateDistance,
    isWithinRadius,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
