import React from "react";

interface CommentProps {
  commentCnt: number;
}
const NumberComment: React.FC<CommentProps> = ({ commentCnt }) => {
  return <div>{commentCnt}</div>;
};

export default NumberComment;
