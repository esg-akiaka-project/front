import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/useUserStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { MessageCircle, Mail, Calendar, Bell, LucideIcon } from "lucide-react";
import styled from "styled-components";
interface SSEProviderProps {
  children: React.ReactNode;
}

const EventSource = EventSourcePolyfill || NativeEventSource;
type EventSourceType = typeof EventSource;
type NotificationType =
  | "POST_COMMENT"
  | "REPLY_COMMENT"
  | "DAILY"
  | "WEEK"
  | "MONTH";

interface CustomToastProps {
  icon: LucideIcon;
  title: string;
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({
  icon: Icon,
  title,
  message,
}) => (
  <NotificationWrapper>
    <IconWrapper>
      <Icon size={24} color="#1e90ff" />
    </IconWrapper>
    <div>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </div>
  </NotificationWrapper>
);
const SSEProvider: React.FC<SSEProviderProps> = ({ children }) => {
  const router = useRouter();
  const { memberId, accessToken } = useUserStore();
  const eventSourceRef = useRef<InstanceType<EventSourceType> | null>(null);

  const notifications: Record<NotificationType, NotificationConfig> = {
    POST_COMMENT: {
      icon: MessageCircle,
      title: "새로운 댓글이 달렸어요",
      message: "작성하신 글에 누군가 관심을 보였네요 ✨",
    },
    REPLY_COMMENT: {
      icon: MessageCircle,
      title: "새로운 답글이 달렸어요",
      message: "댓글에 대한 반응이 도착했어요 💬",
    },
    DAILY: {
      icon: Mail,
      title: "도약 편지가 도착했어요",
      message: "오늘의 특별한 이야기를 확인해보세요 💌",
    },
    WEEK: {
      icon: Calendar,
      title: "주간 리포트가 준비됐어요",
      message: "이번 주 성장의 흔적을 돌아볼 시간이에요 📊",
    },
    MONTH: {
      icon: Bell,
      title: "월간 소식이 도착했어요",
      message: "한 달간의 특별한 순간들을 확인해보세요 🎉",
    },
  };
  interface NotificationConfig {
    icon: LucideIcon;
    title: string;
    message: string;
  }
  const showNotification = (type: NotificationType) => {
    const config = notifications[type];
    toast(
      <CustomToast
        icon={config.icon}
        title={config.title}
        message={config.message}
      />,
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        icon: false,
        className: "!p-0 bg-transparent !mb-2",
        bodyClassName: "!p-0",
        style: {
          background: "none",
          boxShadow: "none",
          marginBottom: "-1.5rem",
        },
      }
    );
  };

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

    Object.entries(notifications).forEach(([event, config]) => {
      eventSource.addEventListener(event as NotificationType, () => {
        showNotification(event as NotificationType);
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
      {process.env.NODE_ENV === "development" && (
        <TestButtonWrapper>
          {(Object.keys(notifications) as NotificationType[]).map((type) => (
            <TestButton key={type} onClick={() => showNotification(type)}>
              테스트: {type}
            </TestButton>
          ))}
        </TestButtonWrapper>
      )}
      <ToastContainer
        closeButton={false}
        className="!bg-transparent"
        toastClassName="!bg-transparent !shadow-none"
      />
    </>
  );
};

export default SSEProvider;

const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  max-width: 360px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

const Message = styled.p`
  font-size: 13px;
  margin: 0;
  color: #666;
`;

const TestButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
`;

const TestButton = styled.button`
  background-color: #1e90ff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #1c86ee;
  }
`;
