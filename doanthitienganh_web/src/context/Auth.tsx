"use client";

import ApiCaller from "@/api-caller";
import CookieHelper from "@/helpers/cookie";
import { AuthState } from "@/types/common";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextFields = {
  state: AuthState;
  user: User | null;
  authMsg: string;

  signIn: (data: { username: string; password: string }) => void;
  signUp: (data: any) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextFields>({
  state: "UnAuthenticated",
  user: null,
  authMsg: "",

  signIn: function (data: { username: string; password: string }): void {
    throw new Error("Function not implemented.");
  },
  signOut: function (): void {
    throw new Error("Function not implemented.");
  },
  signUp: (data: any) => {
    throw new Error("Function not implemented.");
  },
});

export function AuthProvider({ children }: { children: any }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>("CheckingToken");
  const [user, setUser] = useState<User | null>(null);
  const [authMsg, setAuthMsg] = useState("");

  const checkTokenFromCookie = useCallback(() => {
    const token = CookieHelper.getCookie("u-tk");
    if (!token) {
      setState("UnAuthenticated");
      return;
    }

    ApiCaller.setHeader("Authorization", `Bearer ${token}`);
    setState("GettingAuthInfo");
  }, []);

  const getUser = useCallback(() => {
    ApiCaller.getUser().then((data) => {
      if (data) {
        setUser(data);
        setState("Authenticated");
        return;
      }

      CookieHelper.deleteCookie("u-tk");
      ApiCaller.setHeader("Authorization", "");
      setState("UnAuthenticated");
    });
  }, []);

  const signIn = useCallback((data: { username: string; password: string }) => {
    setState("SigningIn");

    ApiCaller.signIn(data).then(({ token, user }) => {
      if (token && user) {
        CookieHelper.setCookie("u-tk", token);
        ApiCaller.setHeader("Authorization", `Bearer ${token}`);
        setUser(user);
        setState("Authenticated");
        setAuthMsg("");
        return;
      }

      setState("UnAuthenticated");
      setAuthMsg("Tên đăng nhập hoặc mật khẩu không đúng");
    });
  }, []);

  const signUp = useCallback((data: any) => {
    setState("SigningUp");

    ApiCaller.signUp(data).then(({ token, user }) => {
      if (token && user) {
        CookieHelper.setCookie("u-tk", token);
        ApiCaller.setHeader("Authorization", `Bearer ${token}`);
        setUser(user);
        setState("Authenticated");
        setAuthMsg("");
        return;
      }

      setState("UnAuthenticated");
      setAuthMsg("Thông tin đăng ký không hợp lệ");
    });
  }, []);

  const signOut = useCallback(() => {
    CookieHelper.deleteCookie("u-tk");
    ApiCaller.setHeader("Authorization", "");
    setState("UnAuthenticated");
    setUser(null);
    router.push("/sign-in");
  }, []);

  useEffect(() => {
    switch (state) {
      case "CheckingToken":
        checkTokenFromCookie();
        break;
      case "GettingAuthInfo":
        getUser();
        break;
    }
  }, [state, checkTokenFromCookie, getUser]);

  return (
    <AuthContext.Provider
      value={{ state, user, authMsg, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextFields {
  return useContext(AuthContext);
}
