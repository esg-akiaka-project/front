import useLogsStore from "../store/useLogStore";

export const useTodayLog = () => {
  const getLogByDate = useLogsStore((state) => state.getLogByDate);

  const checkTodayLog = () => {
    const today = new Date().toISOString().split("T")[0];
    return getLogByDate(today) !== null;
  };

  return checkTodayLog;
}