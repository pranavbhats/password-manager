import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// UI state interface
export interface UIState {
     isVaultLocked: boolean;
     isSidebarOpen: boolean;
     currentPage: string;
     lastActivity: number;
     notifications: Notification[];
     modals: {
          deleteAccount: boolean;
          changePassword: boolean;
          factoryReset: boolean;
     };
}

// Notification interface
export interface Notification {
     id: string;
     type: 'success' | 'error' | 'warning' | 'info';
     title: string;
     message: string;
     timestamp: number;
     read: boolean;
     persistent?: boolean;
}

// Initial state
const initialState: UIState = {
     isVaultLocked: true,
     isSidebarOpen: false,
     currentPage: 'vault',
     lastActivity: Date.now(),
     notifications: [],
     modals: {
          deleteAccount: false,
          changePassword: false,
          factoryReset: false,
     },
};

// UI slice
const uiSlice = createSlice({
     name: 'ui',
     initialState,
     reducers: {
          // Vault lock state
          unlockVault: (state) => {
               state.isVaultLocked = false;
               state.lastActivity = Date.now();
          },

          lockVault: (state) => {
               state.isVaultLocked = true;
          },

          updateActivity: (state) => {
               state.lastActivity = Date.now();
          },

          // Sidebar state
          toggleSidebar: (state) => {
               state.isSidebarOpen = !state.isSidebarOpen;
          },

          setSidebarOpen: (state, action: PayloadAction<boolean>) => {
               state.isSidebarOpen = action.payload;
          },

          // Page navigation
          setCurrentPage: (state, action: PayloadAction<string>) => {
               state.currentPage = action.payload;
          },

          // Modal management
          openModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
               state.modals[action.payload] = true;
          },

          closeModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
               state.modals[action.payload] = false;
          },

          closeAllModals: (state) => {
               Object.keys(state.modals).forEach(key => {
                    state.modals[key as keyof UIState['modals']] = false;
               });
          },

          // Notification management
          addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
               const notification: Notification = {
                    id: Date.now().toString(),
                    timestamp: Date.now(),
                    read: false,
                    ...action.payload,
               };
               state.notifications.unshift(notification);

               // Keep only last 50 notifications
               if (state.notifications.length > 50) {
                    state.notifications = state.notifications.slice(0, 50);
               }
          },

          markNotificationRead: (state, action: PayloadAction<string>) => {
               const notification = state.notifications.find(n => n.id === action.payload);
               if (notification) {
                    notification.read = true;
               }
          },

          markAllNotificationsRead: (state) => {
               state.notifications.forEach(notification => {
                    notification.read = true;
               });
          },

          removeNotification: (state, action: PayloadAction<string>) => {
               state.notifications = state.notifications.filter(n => n.id !== action.payload);
          },

          clearNotifications: (state) => {
               state.notifications = [];
          },

          // Reset UI state (for logout/factory reset)
          resetUI: () => {
               return {
                    ...initialState,
                    lastActivity: Date.now()
               };
          },
     },
});

// Export actions
export const {
     unlockVault,
     lockVault,
     updateActivity,
     toggleSidebar,
     setSidebarOpen,
     setCurrentPage,
     openModal,
     closeModal,
     closeAllModals,
     addNotification,
     markNotificationRead,
     markAllNotificationsRead,
     removeNotification,
     clearNotifications,
     resetUI,
} = uiSlice.actions;

// Selectors
export const selectUI = (state: { ui: UIState }) => state.ui;
export const selectIsVaultLocked = (state: { ui: UIState }) => state.ui.isVaultLocked;
export const selectIsSidebarOpen = (state: { ui: UIState }) => state.ui.isSidebarOpen;
export const selectCurrentPage = (state: { ui: UIState }) => state.ui.currentPage;
export const selectLastActivity = (state: { ui: UIState }) => state.ui.lastActivity;
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications;
export const selectUnreadNotifications = (state: { ui: UIState }) =>
     state.ui.notifications.filter(n => !n.read);
export const selectModals = (state: { ui: UIState }) => state.ui.modals;

// Export reducer
export default uiSlice.reducer;