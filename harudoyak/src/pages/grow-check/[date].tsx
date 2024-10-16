import React from "react";
import { useRouter } from "next/router";

const DailyDetail: React.FC = () => {
  const router = useRouter();
  const { date } = router.query;

  return <div>DailyDetail for {date}</div>;
};

export default DailyDetail;
