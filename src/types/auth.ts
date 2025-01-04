export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}