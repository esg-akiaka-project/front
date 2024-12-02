// 공통 베이스 타입
interface BaseAlarmData {
  notificationId: number;
  sseEventName: string;
  category: string;
  isRead: boolean;
  creationDate: Date;
}

// 도약 알람 데이터 타입
interface DoyakData {
  sender?: string;
  logId?: number;
  content?: string;
  startDate?: string;
  count?: number;
}

// 커뮤니티 알람 데이터 타입
interface CommunityData {
  sender: string;
  shareDoyakId: number;
  content: string;
  postContent: string;
}

// 최종 알람 타입
export interface DoyakAlarmData extends BaseAlarmData {
  data: DoyakData;
  sseEventName: "DAILY" | "WEEK" | "MONTH";
  category: "log";
}

export interface CommunityAlarmData extends BaseAlarmData {
  data: CommunityData;
  sseEventName: "POST_COMMENT" | "REPLY_COMMENT";
  category: "post";
}

// 컴포넌트에서 사용할 때는
export type AlarmData = DoyakAlarmData | CommunityAlarmData;

// 컴포넌트에서 타입 가드 사용
export const isDoyakAlarm = (alarm: AlarmData): alarm is DoyakAlarmData => {
  return alarm.category === "log";
};

export const isCommunityAlarm = (
  alarm: AlarmData
): alarm is CommunityAlarmData => {
  return alarm.category === "post";
};
