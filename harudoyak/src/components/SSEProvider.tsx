import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/useUserStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SSEProviderProps {
  children: React.ReactNode;
}

const SSEProvider: React.FC<SSEProviderProps> = ({ children }) => {
  const router = useRouter();
  const { memberId } = useUserStore();
  const eventSourceRef = useRef<EventSource | null>(null); // SSE 연결 관리용 Ref

  useEffect(() => {
    // 제외할 경로들 (로그인/회원가입 페이지)
    const excludedPaths = ["/log-in", "/sign-up"];

    // 제외 경로에 포함되거나 memberId가 없는 경우에는 SSE 연결하지 않음
    if (excludedPaths.includes(router.pathname) || !memberId) {
      return;
    }

    // 이미 연결되어 있는 경우 중복 연결 방지
    if (eventSourceRef.current) {
      return;
    }

    // SSE 연결 설정
    const eventSource = new EventSource(
      `https://harudoyak.site/api/notification/subscribe/${memberId}`
    );
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("SSE 연결 성공");
    };

    eventSource.addEventListener("letter", (event) => {
      toast.info(`새 알림: ${event.data}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    eventSource.onerror = (error) => {
      console.error("Error with SSE connection:", error);
      eventSource.close(); // 오류 발생 시 연결 닫기
      eventSourceRef.current = null; // Ref 초기화
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null; // 컴포넌트 언마운트 시 연결 닫기
      }
    };
  }, [memberId, router.pathname]);

  const sendTestNotification = async () => {
    if (!memberId) {
      console.error("memberId가 없습니다. 알림을 보낼 수 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        `https://harudoyak.site/api/notification/add?memberId=${memberId}&content=테스트 알림입니다.`,
        {
          method: "post", // 서버의 `add` 엔드포인트에서 GET 요청을 사용하는 것 같아서 GET으로 설정
        }
      );

      if (response.ok) {
        console.log("테스트 알림 요청이 성공적으로 전송되었습니다.");
      } else {
        console.error("테스트 알림 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("알림 전송 중 오류 발생:", error);
    }
  };
  return (
    <>
      {children}
      <button onClick={sendTestNotification}>테스트 알림 보내기</button>
      <ToastContainer />
    </>
  );
};

export default SSEProvider;
