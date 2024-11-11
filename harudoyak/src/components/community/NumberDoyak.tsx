import React from "react";

interface NumberProps {
  count: number;
}
const NumberDoyak: React.FC<NumberProps> = ({ count }) => {
  return <div>{count}</div>;
};

export default NumberDoyak;
