import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import type {
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { PasswordEntry, PasswordEntryForm } from '../../types';

// Firestore collections
const COLLECTIONS = {
  USERS: 'users',
  PASSWORD_ENTRIES: 'passwordEntries'
} as const;

// Firestore service functions
export const firestoreService = {
  // Password Entries Operations

  // Create a new password entry
  async createPasswordEntry(userId: string, entryData: PasswordEntryForm): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.PASSWORD_ENTRIES), {
        ...entryData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastUsed: entryData.lastUsed ? new Date(entryData.lastUsed) : null
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating password entry:', error);
      throw error;
    }
  },

  // Get all password entries for a user
  async getPasswordEntries(userId: string): Promise<PasswordEntry[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.PASSWORD_ENTRIES),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const entries: PasswordEntry[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        entries.push({
          id: doc.id,
          title: data.title,
          username: data.username,
          password: data.password,
          url: data.url || '',
          notes: data.notes || '',
          category: data.category,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastUsed: data.lastUsed?.toDate(),
          strength: data.strength || 'medium'
        });
      });

      return entries;
    } catch (error) {
      console.error('Error fetching password entries:', error);
      throw error;
    }
  },

  // Get a single password entry by ID
  async getPasswordEntry(userId: string, entryId: string): Promise<PasswordEntry | null> {
    try {
      const docRef = doc(db, COLLECTIONS.PASSWORD_ENTRIES, entryId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Verify the entry belongs to the user
        if (data.userId !== userId) {
          throw new Error('Unauthorized access to password entry');
        }

        return {
          id: docSnap.id,
          title: data.title,
          username: data.username,
          password: data.password,
          url: data.url || '',
          notes: data.notes || '',
          category: data.category,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastUsed: data.lastUsed?.toDate(),
          strength: data.strength || 'medium'
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching password entry:', error);
      throw error;
    }
  },

  // Update a password entry
  async updatePasswordEntry(userId: string, entryId: string, entryData: Partial<PasswordEntryForm>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.PASSWORD_ENTRIES, entryId);

      // First verify the entry belongs to the user
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data().userId !== userId) {
        throw new Error('Unauthorized access to password entry');
      }

      await updateDoc(docRef, {
        ...entryData,
        updatedAt: serverTimestamp(),
        lastUsed: entryData.lastUsed ? new Date(entryData.lastUsed) : undefined
      });
    } catch (error) {
      console.error('Error updating password entry:', error);
      throw error;
    }
  },

  // Delete a password entry
  async deletePasswordEntry(userId: string, entryId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.PASSWORD_ENTRIES, entryId);

      // First verify the entry belongs to the user
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data().userId !== userId) {
        throw new Error('Unauthorized access to password entry');
      }

      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting password entry:', error);
      throw error;
    }
  },

  // Update last used timestamp for a password entry
  async updateLastUsed(userId: string, entryId: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.PASSWORD_ENTRIES, entryId);

      // First verify the entry belongs to the user
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data().userId !== userId) {
        throw new Error('Unauthorized access to password entry');
      }

      await updateDoc(docRef, {
        lastUsed: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating last used timestamp:', error);
      throw error;
    }
  },

  // Search password entries
  async searchPasswordEntries(userId: string, searchTerm: string): Promise<PasswordEntry[]> {
    try {
      // Note: Firestore doesn't support full-text search out of the box
      // This is a basic implementation - consider using Algolia or similar for advanced search
      const q = query(
        collection(db, COLLECTIONS.PASSWORD_ENTRIES),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const entries: PasswordEntry[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        const entry = {
          id: doc.id,
          title: data.title,
          username: data.username,
          password: data.password,
          url: data.url || '',
          notes: data.notes || '',
          category: data.category,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastUsed: data.lastUsed?.toDate(),
          strength: data.strength || 'medium'
        };

        // Client-side filtering for search
        if (
          entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          entry.notes.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          entries.push(entry);
        }
      });

      return entries;
    } catch (error) {
      console.error('Error searching password entries:', error);
      throw error;
    }
  },

  // Get recent password entries (last 5)
  async getRecentPasswordEntries(userId: string): Promise<PasswordEntry[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.PASSWORD_ENTRIES),
        where('userId', '==', userId),
        orderBy('lastUsed', 'desc'),
        limit(5)
      );

      const querySnapshot = await getDocs(q);
      const entries: PasswordEntry[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        entries.push({
          id: doc.id,
          title: data.title,
          username: data.username,
          password: data.password,
          url: data.url || '',
          notes: data.notes || '',
          category: data.category,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastUsed: data.lastUsed?.toDate(),
          strength: data.strength || 'medium'
        });
      });

      return entries;
    } catch (error) {
      console.error('Error fetching recent password entries:', error);
      throw error;
    }
  }
};

export default firestoreService;