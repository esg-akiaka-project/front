// SEO를 위한 설정file
// next-seo 라이브러리를 활용함   https://github.com/garmeeh/next-seo?tab=readme-ov-file

const defaultSEOConfig = {
  title: "하루도약",
  titleTemplate: "%s | 여러분의 하루를 응원합니다",
  description:
    "하루하루 배움의 끝이 없는 취준생, 사회 초년생들을 AI 피드백 서비스",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "www.harudoyak.site",
    siteName: "하루도약",
    icons: {
      icon: "./public/favicon.ico",
    },
  },
};

export default defaultSEOConfig;
