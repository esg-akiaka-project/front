// components/Layout.tsx
import React from "react";
import NavigationBar from "./common/navigationbar/NavigationBar";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  // 내비게이션 바를 제외할 페이지 경로 설정
  const noNavPages = [
    currentPath.startsWith("/log-in"), // 로그인 및 회원가입 하위 페이지는 모두 제외
    currentPath.startsWith("/sign-up"),
    currentPath.startsWith("/grow-up-record"),
    currentPath.startsWith("/writing-page"),

    currentPath === "/community/select-picture",
    currentPath === "/community/select-comment",
 // 추가된 부분: community/select-picture 페이지 제외
  ];
  const isNoNavPage = noNavPages.some((condition) => condition);

  return (
    <div>
      {children}
      {!isNoNavPage && <NavigationBar />}
    </div>
  );
};

export default Layout;
