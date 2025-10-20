// Auth form types
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// Auth service types
export interface AuthService {
  register(data: RegisterFormData): Promise<void>;
  login(data: LoginFormData): Promise<void>;
  logout(): Promise<void>;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
}

// User type (re-export from users feature)
export interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
