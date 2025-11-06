import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import { auth } from '../../config/firebase';// Authentication service functions
export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Sign out
  async signOut(): Promise<void> {
    try {
      // Clear any cached data/tokens before signing out
      localStorage.removeItem('vaultKey');
      sessionStorage.clear();

      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  },

  // Update user password
  async updatePassword(newPassword: string): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');
      await updatePassword(user, newPassword);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(displayName: string): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');
      await firebaseUpdateProfile(user, { displayName });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Update user email
  async updateEmail(newEmail: string): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');
      await firebaseUpdateEmail(user, newEmail);
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  },

  // Delete user account
  async deleteAccount(currentPassword: string): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error('No authenticated user');

      // Re-authenticate user before deleting account
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Delete the user account
      await deleteUser(user);
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return auth.currentUser !== null;
  }
};

export default authService;