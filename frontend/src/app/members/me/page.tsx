"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";

export default function Page() {
  const { loginMember } = useAuthContext();

  return (
    <>
      <h1>내 정보</h1>

      <div>{JSON.stringify(loginMember)}</div>
    </>
  );
}
