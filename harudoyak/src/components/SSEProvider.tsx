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
    const excludedPaths = ["/log-in", "/sign-up", "/oauth?code"];

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

    eventSource.addEventListener("POST_COMMENT", (event) => {
      toast.info(`새 알림: 내글에 댓글이 달렸어요`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });

    eventSource.addEventListener("REPLY_COMMENT", (event) => {
      toast.info(`새 알림: 내 댓글에 댓글이 달렸어요`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    eventSource.addEventListener("DAILY", (event) => {
      toast.info(`새 알림: 도약 편지가 도착했어요`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    eventSource.addEventListener("WEEK", (event) => {
      toast.info(`새 알림: 주간 알림이 도착했어요`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    eventSource.addEventListener("MONTH", (event) => {
      toast.info(`새 알림: 월간 알림이 도착했어요`, {
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

  return (
    <>
      {children}

      <ToastContainer />
    </>
  );
};

export default SSEProvider;
