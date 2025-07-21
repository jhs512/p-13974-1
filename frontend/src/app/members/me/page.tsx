"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";

export default function Page() {
  const { loginMember } = useAuthContext();

  return (
    <>
      <h1>내 정보</h1>

      <div>ID : {loginMember.id}</div>
      <div>가입 : {loginMember.createDate}</div>
      <div>수정 : {loginMember.modifyDate}</div>
      <div>이름 : {loginMember.name}</div>
    </>
  );
}
