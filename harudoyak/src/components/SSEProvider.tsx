import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/useUserStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
interface SSEProviderProps {
  children: React.ReactNode;
}
const EventSource = EventSourcePolyfill || NativeEventSource;
type EventSourceType = typeof EventSource;

const SSEProvider: React.FC<SSEProviderProps> = ({ children }) => {
  const router = useRouter();
  const { memberId, accessToken } = useUserStore();
  const eventSourceRef = useRef<InstanceType<EventSourceType> | null>(null);

  useEffect(() => {
    const excludedPaths = ["/log-in", "/sign-up"];

    if (excludedPaths.includes(router.pathname) || !memberId) {
      return;
    }

    if (eventSourceRef.current) {
      return;
    }

    const eventSource = new EventSource(
      `https://harudoyak.site/api/notification/subscribe/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "text/event-stream",
          Connection: "keep-alive",
          "Cache-Control": "no-cache",
        },
        withCredentials: true,
      }
    );
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("SSE 연결 성공");
    };

    eventSource.addEventListener("letter", (event) => {
      toast.info(`새 알림: ${event}`, {
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
      eventSource.close();
      eventSourceRef.current = null;
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();

        eventSourceRef.current = null;
      }
    };
  }, [memberId, router.pathname]);

  // const sendTestNotification = async () => {
  //   if (!memberId) {
  //     console.error("memberId가 없습니다. 알림을 보낼 수 없습니다.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `https://harudoyak.site/api/notification/add?memberId=${memberId}&content=테스트 알림입니다.`,
  //       {
  //         method: "post", // 서버의 `add` 엔드포인트에서 GET 요청을 사용하는 것 같아서 GET으로 설정
  //       }
  //     );

  //     if (response.ok) {
  //       console.log("테스트 알림 요청이 성공적으로 전송되었습니다.");
  //     } else {
  //       console.error("테스트 알림 요청에 실패했습니다.");
  //     }
  //   } catch (error) {
  //     console.error("알림 전송 중 오류 발생:", error);
  //   }
  // };
  return (
    <>
      {children}
      {/* <button onClick={sendTestNotification}>테스트 알림 보내기</button> */}
      <ToastContainer />
    </>
  );
};

export default SSEProvider;
