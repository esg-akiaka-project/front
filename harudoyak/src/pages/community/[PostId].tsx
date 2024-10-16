import React from "react";
import { useRouter } from "next/router";

const PostDetail: React.FC = () => {
  const router = useRouter();
  const { PostId } = router.query;
  return <div>PostDetail for {PostId}</div>;
};

export default PostDetail;
