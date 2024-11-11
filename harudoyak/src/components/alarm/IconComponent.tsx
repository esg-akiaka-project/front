import React from "react";
import Image from "next/image";
import messageIcon from "../../Images/messageIcon.png";

interface IconComponentProps {
  isClicked: boolean;
}

const IconComponent: React.FC<IconComponentProps> = ({ isClicked }) => {
  return (
    <div style={{
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      display: "inline-block",
      opacity: isClicked ? 0.3 : 0.8,
    }}>
      <Image src={messageIcon} alt="message Icon" width={80} height={80} />
    </div>
  );
};

export default IconComponent;