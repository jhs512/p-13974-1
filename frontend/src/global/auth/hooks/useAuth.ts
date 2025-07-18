import { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { createContext, use, useEffect, useState } from "react";

type MemberDto = components["schemas"]["MemberDto"];

export default function useAuth() {
  const [loginMember, setLoginMember] = useState<MemberDto | null>(null);
  const isLogin = loginMember !== null;

  useEffect(() => {
    client.GET("/api/v1/members/me").then((res) => {
      if (res.error) return;

      setLoginMember(res.data);
    });
  }, []);

  const clearLoginMember = () => {
    setLoginMember(null);
  };

  const logout = (onSuccess: () => void) => {
    client.DELETE("/api/v1/members/logout").then((res) => {
      if (res.error) {
        alert(res.error.msg);
        return;
      }

      clearLoginMember();

      onSuccess();
    });
  };

  if (isLogin)
    return { isLogin: true, loginMember, logout, setLoginMember } as const;

  return {
    isLogin: false,
    loginMember: null,
    logout,
    setLoginMember,
  } as const;
}

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null,
);

export function useAuthContext() {
  const authState = use(AuthContext);

  if (authState === null) throw new Error("AuthContext is not found");

  return authState;
}
