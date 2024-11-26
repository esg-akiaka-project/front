// pages/_app.tsx
// 공통 레이아웃 추가하기 (ex. Header, GlobalStyle, Redux 등)
// 페이지 내에서 전역적으로 적용할 내용 작성해 주시면 됩니다!

import React from "react";
import type { AppProps } from "next/app";
import GlobalStyle from "../style/GlobalStyle";
import Layout from "../components/Layout";
import { PostDataProvider } from "../context/PostDataContext";
import defaultSEOConfig from "../../next-seo.config";
import { DefaultSeo } from "next-seo";
import SSEProvider from "../components/SSEProvider";
import { AuthProvider, useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function MyAppContent({ Component, pageProps }: AppProps) {
  const { isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <LoadingSpinner />;
  }
  return (
    <Layout>
      <SSEProvider>
        <PostDataProvider>
          <Component {...pageProps} />
        </PostDataProvider>
      </SSEProvider>
    </Layout>
  );
}
function App(props: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEOConfig} />
      <GlobalStyle />
      <AuthProvider>
        <MyAppContent {...props} />
      </AuthProvider>
    </>
  );
}

export default App;
