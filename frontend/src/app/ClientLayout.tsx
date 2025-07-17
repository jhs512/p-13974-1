"use client";

import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { createContext, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

type MemberDto = components["schemas"]["MemberDto"];

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null,
);

function useAuth() {
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

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authState = useAuth();
  const router = useRouter();

  const { loginMember, isLogin, logout: _logout } = authState;

  const logout = () => {
    _logout(() => router.replace("/"));
  };

  return (
    <AuthContext value={authState}>
      <header>
        <nav className="flex">
          <Link href="/" className="p-2 rounded hover:bg-gray-100">
            메인
          </Link>
          <Link href="/posts" className="p-2 rounded hover:bg-gray-100">
            글 목록
          </Link>
          {!isLogin && (
            <Link
              href="/members/login"
              className="p-2 rounded hover:bg-gray-100"
            >
              로그인
            </Link>
          )}
          {isLogin && (
            <button onClick={logout} className="p-2 rounded hover:bg-gray-100">
              로그아웃
            </button>
          )}
          {isLogin && (
            <Link href="/members/me" className="p-2 rounded hover:bg-gray-100">
              {loginMember.name}님의 정보
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="text-center p-2">푸터</footer>
    </AuthContext>
  );
}
