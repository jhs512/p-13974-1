"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";

export default function withLogin(Component: React.ComponentType) {
  return function WithLoginComponent(
    props: React.ComponentProps<typeof Component>,
  ) {
    const { isLogin } = useAuthContext();

    if (!isLogin) {
      return <div>로그인 후 이용해주세요.</div>;
    }

    return <Component {...props} />;
  };
}
