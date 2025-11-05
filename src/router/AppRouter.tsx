import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import RouteTransition from '../components/templates/RouteTransition';

// Pages
import SplashPage from '../pages/Splash';
import { LoginPage, SignupPage } from '../pages/Auth';
import VaultHomePage from '../pages/VaultHome/VaultHomePage';
import AddEditEntryPage from '../pages/AddEditEntry';

// Placeholder components for other routes
const UnlockVaultPage = () => <div>Unlock Vault Page - Coming Soon</div>;
const ViewEntryPage = () => <div>View Entry Page - Coming Soon</div>;
const AnalysisPage = () => <div>Analysis Page - Coming Soon</div>;
const SettingsPage = () => <div>Settings Page - Coming Soon</div>;

const AppRouter = () => {
     return (
          <Router>
               <RouteTransition
                    duration={1200}
                    skipPaths={['/']}
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
               </RouteTransition>
          </Router>
     );
};

export default AppRouter;