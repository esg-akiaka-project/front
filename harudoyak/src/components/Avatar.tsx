// 개인프로필 사진
// todo: 로그인할때 zustand 전역상태변수로 추가해야할듯

import Image from "next/image";
import Anonymous from "@/public/assets/common/Anonymous.svg";
import { useUserStore } from "../store/useUserStore";

const Avatar: React.FC = () => {
  const { profileImage } = useUserStore();
  const img = profileImage === null ? Anonymous : profileImage;

  return (
    <Image
      src={img}
      alt={"Profile"}
      width={100} // 원하는 너비와 높이로 조정
      height={100}
    />
  );
};

export default Avatar;
