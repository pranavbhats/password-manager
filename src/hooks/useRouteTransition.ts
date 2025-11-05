import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface UseRouteTransitionProps {
     duration?: number;
     skipPaths?: string[];
}

export const useRouteTransition = ({
     duration = 1500,
     skipPaths = ['/']
}: UseRouteTransitionProps = {}) => {
     const [isLoading, setIsLoading] = useState(false);
     const [loadingMessage, setLoadingMessage] = useState('Loading...');
     const location = useLocation();

     // Messages for different routes
     const getLoadingMessage = (pathname: string): string => {
          if (pathname.includes('/vault')) return 'Accessing your vault...';
          if (pathname.includes('/login')) return 'Preparing login...';
          if (pathname.includes('/signup')) return 'Setting up account...';
          if (pathname.includes('/settings')) return 'Loading settings...';
          if (pathname.includes('/analysis')) return 'Analyzing security...';
          if (pathname.includes('/add') || pathname.includes('/edit')) return 'Preparing form...';
          return 'Loading...';
     };

     useEffect(() => {
          // Skip loading screen for certain paths
          if (skipPaths.includes(location.pathname)) {
               return;
          }

          setIsLoading(true);
          setLoadingMessage(getLoadingMessage(location.pathname));

          const timer = setTimeout(() => {
               setIsLoading(false);
          }, duration);

          return () => clearTimeout(timer);
     }, [location.pathname, duration, skipPaths]);

     return {
          isLoading,
          loadingMessage,
          setIsLoading
     };
};