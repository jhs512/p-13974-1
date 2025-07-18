"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";

export default function withLogout(Component: React.ComponentType) {
  return function WithLogoutComponent(
    props: React.ComponentProps<typeof Component>,
  ) {
    const { isLogin } = useAuthContext();

    if (isLogin) {
      return <div>이미 로그인 되었습니다.</div>;
    }

    return <Component {...props} />;
  };
}
