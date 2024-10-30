// 개인프로필 사진
// 로그인할때 zustand 전역상태변수로 추가해야할듯

import Image from "next/image";
import Anonymous from "@/public/assets/common/Anonymous.svg";
const Avatar: React.FC = () => {
  return (
    <Image
      src={Anonymous}
      alt="Profile"
      width={100} // 원하는 너비와 높이로 조정
      height={100}
    />
  );
};

export default Avatar;
