/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";

type DemoUser = {
  displayName: string | null;
  email: string | null;
};

type SignUpPayload = {
  email: string;
  password: string;
  displayName?: string;
};

type AuthContextValue = {
  user: DemoUser | null;
  initializing: boolean;
  authLoading: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signOutUser: () => Promise<void>;
  resetAuthError: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<DemoUser | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const showDemoMessage = async () => {
    setAuthLoading(true);
    setAuthError(null);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    const error = new Error("Demo mode");
    setAuthError("โหมดสาธิต: ระบบบัญชียังไม่ได้เชื่อมต่อ");
    setAuthLoading(false);
    throw error;
  };

  const signIn = async (_email: string, _password: string) => showDemoMessage();

  const signUp = async (_payload: SignUpPayload) => showDemoMessage();

  const signOutUser = async () => undefined;

  const resetAuthError = () => setAuthError(null);

  const value = {
    user,
    initializing: false,
    authLoading,
    authError,
    signIn,
    signUp,
    signOutUser,
    resetAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
