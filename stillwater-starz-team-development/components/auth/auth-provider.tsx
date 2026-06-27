"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  getUserProfile,
  listenToAuthState,
  type User,
  type UserProfile,
} from "@/lib/firebase/auth";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const profileRequest = useRef(0);

  const refreshProfile = useCallback(async () => {
    const requestId = ++profileRequest.current;
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setProfile(null);
      return null;
    }

    const nextProfile = await getUserProfile(currentUser.uid);
    if (profileRequest.current === requestId) setProfile(nextProfile);
    return nextProfile;
  }, []);

  useEffect(() => {
    return listenToAuthState(async (nextUser) => {
      const requestId = ++profileRequest.current;
      setUser(nextUser);

      if (!nextUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const nextProfile = await getUserProfile(nextUser.uid);
        if (profileRequest.current === requestId) setProfile(nextProfile);
      } catch {
        if (profileRequest.current === requestId) setProfile(null);
      } finally {
        if (profileRequest.current === requestId) setLoading(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({ user, profile, loading, refreshProfile }),
    [user, profile, loading, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
