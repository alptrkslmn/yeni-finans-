import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 
  | 'admin' 
  | 'country_coordinator' 
  | 'financial_manager'
  | 'institution_manager'
  | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  countryCode?: string;
  institutionId?: string;
  permissions: string[];
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const defaultPermissions = {
  admin: [
    'manage_users',
    'manage_roles',
    'manage_institutions',
    'manage_countries',
    'manage_settings',
    'manage_transactions',
    'view_reports',
    'export_data',
  ],
  country_coordinator: [
    'manage_institutions',
    'manage_transactions',
    'view_reports',
    'export_data',
  ],
  financial_manager: [
    'manage_transactions',
    'view_reports',
    'export_data',
  ],
  institution_manager: [
    'manage_transactions',
    'view_reports',
  ],
  viewer: [
    'view_reports',
  ],
};

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => {
        // Rol bazlı izinleri otomatik ekle
        const permissions = [
          ...(defaultPermissions[user.role] || []),
          ...(user.permissions || []),
        ];

        set({
          user: { ...user, permissions },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (data) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...data },
          });
        }
      },

      hasPermission: (permission) => {
        const user = get().user;
        if (!user) return false;
        return user.permissions.includes(permission);
      },

      hasRole: (roles) => {
        const user = get().user;
        if (!user) return false;
        
        if (Array.isArray(roles)) {
          return roles.includes(user.role);
        }
        return user.role === roles;
      },
    }),
    {
      name: 'finance-auth',
    }
  )
);