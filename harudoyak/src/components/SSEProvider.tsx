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
      `https://localhost/subscribe/${memberId}`
    );
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      toast.info(`새 알림: ${event.data}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

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
  const handleTestNotification = () => {
    toast.info("테스트 알림: ", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      {children}
      {/* <button onClick={handleTestNotification}>알림 테스트</button>
      <ToastContainer /> */}
    </>
  );
};

export default SSEProvider;
