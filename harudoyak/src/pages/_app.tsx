// pages/_app.tsx
// 공통 레이아웃 추가하기 (ex. Header, GlobalStyle, Redux 등)
// 페이지 내에서 전역적으로 적용할 내용 작성해 주시면 됩니다!

import { useEffect } from "react";
import type { AppProps } from "next/app";
import GlobalStyle from "../style/GlobalStyle";
import Layout from "../components/Layout";
import {PostDataProvider} from '../context/PostDataContext';

// 새로고침마다 토큰 상태 확인 및 갱신 하기위해 useEffect에 해당 함수 설정해야함
import { checkAndRefreshToken } from "../store/tokenService";

function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {}, []);
  return (
    <>
      <GlobalStyle />
      <Layout>
        <PostDataProvider>
          <Component {...pageProps} />
        </PostDataProvider>
      </Layout>
    </>
  );
}

export default App;
