import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import RouteTransition from '../components/templates/RouteTransition';
import ProtectedRoute from '../components/templates/ProtectedRoute';
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

                              {/* Authentication Routes - Only for non-authenticated users */}
                              <Route
                                   path={ROUTES.LOGIN}
                                   element={
                                        <ProtectedRoute requireAuth={false}>
                                             <LoginPage />
                                        </ProtectedRoute>
                                   }
                              />
                              <Route
                                   path={ROUTES.SIGNUP}
                                   element={
                                        <ProtectedRoute requireAuth={false}>
                                             <SignupPage />
                                        </ProtectedRoute>
                                   }
                              />

                              {/* Protected Vault Routes - Require authentication */}
                              <Route
                                   path={ROUTES.UNLOCK_VAULT}
                                   element={
                                        <ProtectedRoute>
                                             <UnlockVaultPage />
                                        </ProtectedRoute>
                                   }
                              />
                              <Route
                                   path={ROUTES.VAULT_HOME}
                                   element={
                                        <ProtectedRoute>
                                             <VaultHomePage />
                                        </ProtectedRoute>
                                   }
                              />
                              <Route
                                   path={ROUTES.ADD_ENTRY}
                                   element={
                                        <ProtectedRoute>
                                             <AddEditEntryPage />
                                        </ProtectedRoute>
                                   }
                              />
                              <Route
                                   path={ROUTES.EDIT_ENTRY}
                                   element={
                                        <ProtectedRoute>
                                             <AddEditEntryPage />
                                        </ProtectedRoute>
                                   }
                              />
                              <Route
                                   path={ROUTES.VIEW_ENTRY}
                                   element={
                                        <ProtectedRoute>
                                             <ViewEntryPage />
                                        </ProtectedRoute>
                                   }
                              />

                              {/* Protected App Features - Require authentication */}
                              <Route
                                   path={ROUTES.ANALYSIS}
                                   element={
                                        <ProtectedRoute>
                                             <AnalysisPage />
                                        </ProtectedRoute>
                                   }
                              />
                              <Route
                                   path={ROUTES.SETTINGS}
                                   element={
                                        <ProtectedRoute>
                                             <SettingsPage />
                                        </ProtectedRoute>
                                   }
                              />

                              {/* Catch all route - redirect to splash */}
                              <Route path="*" element={<Navigate to={ROUTES.SPLASH} replace />} />
                         </Routes>
                    </Suspense>
               </RouteTransition>
          </Router>
     );
};

export default AppRouter;