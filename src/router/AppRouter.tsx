import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import RouteTransition from '../components/templates/RouteTransition';
import LoadingScreen from '../components/organisms/LoadingScreen';

// Lazy load pages for better performance
const SplashPage = lazy(() => import('../pages/Splash'));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('../pages/Auth/SignupPage'));
const VaultHomePage = lazy(() => import('../pages/VaultHome/VaultHomePage'));
const AddEditEntryPage = lazy(() => import('../pages/AddEditEntry'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'));

// Lazy load placeholder components
const UnlockVaultPage = lazy(() => Promise.resolve({
     default: () => <div>Unlock Vault Page - Coming Soon</div>
}));
const ViewEntryPage = lazy(() => Promise.resolve({
     default: () => <div>View Entry Page - Coming Soon</div>
}));
const AnalysisPage = lazy(() => Promise.resolve({
     default: () => <div>Analysis Page - Coming Soon</div>
}));

const AppRouter = () => {
     return (
          <Router>
               <RouteTransition
                    duration={1200}
                    skipPaths={['/']}
               >
                    <Suspense
                         fallback={
                              <LoadingScreen
                                   isVisible={true}
                                   message="Loading page..."
                                   duration={800}
                                   showLogo={false}
                              />
                         }
                    >
                         <Routes>
                              {/* Splash Screen - Initial route */}
                              <Route path={ROUTES.SPLASH} element={<SplashPage />} />

                              {/* Authentication Routes */}
                              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                              <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

                              {/* Vault Routes */}
                              <Route path={ROUTES.UNLOCK_VAULT} element={<UnlockVaultPage />} />
                              <Route path={ROUTES.VAULT_HOME} element={<VaultHomePage />} />
                              <Route path={ROUTES.ADD_ENTRY} element={<AddEditEntryPage />} />
                              <Route path={ROUTES.EDIT_ENTRY} element={<AddEditEntryPage />} />
                              <Route path={ROUTES.VIEW_ENTRY} element={<ViewEntryPage />} />

                              {/* App Features */}
                              <Route path={ROUTES.ANALYSIS} element={<AnalysisPage />} />
                              <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />

                              {/* Catch all route - redirect to splash */}
                              <Route path="*" element={<Navigate to={ROUTES.SPLASH} replace />} />
                         </Routes>
                    </Suspense>
               </RouteTransition>
          </Router>
     );
};

export default AppRouter;