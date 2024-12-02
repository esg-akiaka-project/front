// 개인프로필 사진

import Image from "next/image";
import Anonymous from "@/public/assets/common/Anonymous.svg";
import { useUserStore } from "../store/useUserStore";

const Avatar: React.FC = () => {
  const { profileImage } = useUserStore();
  const img = profileImage === null ? Anonymous : profileImage;

  return <Image src={img} alt={"Profile"} width={100} height={100} />;
};

export default Avatar;
