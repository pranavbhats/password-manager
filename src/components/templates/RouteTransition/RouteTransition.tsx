import type { ReactNode } from 'react';
import LoadingScreen from '../../organisms/LoadingScreen';
import { useRouteTransition } from '../../../hooks/useRouteTransition';

interface RouteTransitionProps {
     children: ReactNode;
     duration?: number;
     skipPaths?: string[];
}

const RouteTransition: React.FC<RouteTransitionProps> = ({
     children,
     duration = 1200,
     skipPaths = ['/']
}) => {
     const { isLoading, loadingMessage } = useRouteTransition({
          duration,
          skipPaths
     });

     return (
          <>
               <LoadingScreen
                    isVisible={isLoading}
                    message={loadingMessage}
                    duration={duration}
                    showLogo={true}
               />
               {!isLoading && children}
          </>
     );
};

export default RouteTransition;