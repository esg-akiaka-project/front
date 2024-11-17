import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Log {
  logId: number;
  creationDate: string;
}

interface LogState {
  logs: Log[];
  setLogs: (logs: Log[]) => void;
  getLogByDate: (date: string) => number | null;
  clearLogs: () => void;
}

export const useLogsStore = create<LogState>()(
  persist(
    (set, get) => ({
      logs: [],
      setLogs: (logs) => set({ logs }),
      getLogByDate: (date) => {
        const foundLog = get().logs.find((log) =>
          log.creationDate.startsWith(date)
        );
        return foundLog ? foundLog.logId : null;
      },
      clearLogs: () => {
        set({ logs: [] });
      },
    }),
    {
      name: "logsStorage",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => key !== "getLogByDate" && !key.startsWith("set")
          )
        ),
    }
  )
);

export default useLogsStore;
