// logsStore.ts
import { create } from "zustand";

interface LogState {
  logs: { logId: number; creationDate: string }[];
  setLogs: (logs: { logId: number; creationDate: string }[]) => void;
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
