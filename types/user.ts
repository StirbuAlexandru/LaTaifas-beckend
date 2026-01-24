import { Address } from './order';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  addresses: Address[];
  defaultAddressId?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  preferences?: UserPreferences;
}

export type UserRole = 'customer' | 'admin' | 'staff';

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  orderUpdates: boolean;
  specialOffers: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
