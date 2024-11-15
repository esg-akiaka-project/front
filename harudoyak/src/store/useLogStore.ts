import { create } from "zustand";

interface Log {
  logId: number;
  creationDate: string;
}

interface LogState {
  logs: Log[];
  setLogs: (logs: Log[]) => void;
  getLogByDate: (date: string) => number | null;
}

const useLogsStore = create<LogState>((set, get) => ({
  logs: [],
  setLogs: (logs) => set({ logs }),
  getLogByDate: (date) => {
    const foundLog = get().logs.find((log) =>
      log.creationDate.startsWith(date)
    );
    return foundLog ? foundLog.logId : null;
  },
}));

export default useLogsStore;
