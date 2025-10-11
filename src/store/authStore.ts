import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the user interface
interface User {
  email: string;
  name: string;
  username?: string;
  phone?: string;
}

// Define the auth store state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

// Create the zustand store with persist middleware
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoginModalOpen: false,
      isRegisterModalOpen: false,

      // Login function that accepts email and password
      login: async (email: string, password: string) => {
        // For now, we'll use the fake credentials
        if (email === 'admin@gmail.com' && password === 'admin') {
          set({
            user: {
              email: 'admin@gmail.com',
              name: 'Admin User',
              username: 'admin',
              phone: '0123456789'
            },
            isAuthenticated: true,
            isLoginModalOpen: false,
          });
          return true;
        }
        return false;
      },

      // Logout function
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      // Update user profile
      updateProfile: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      // Modal control functions
      openLoginModal: () => set({ isLoginModalOpen: true, isRegisterModalOpen: false }),
      closeLoginModal: () => set({ isLoginModalOpen: false }),
      openRegisterModal: () => set({ isRegisterModalOpen: true, isLoginModalOpen: false }),
      closeRegisterModal: () => set({ isRegisterModalOpen: false }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      // Only persist specific state values
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
