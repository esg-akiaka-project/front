import React, { useState } from "react";
import styled from "styled-components";
import iconReload from "../../../public/assets/common/icon_reload.svg";
import Image from "next/image";
import { createTags } from "@/src/apis/openAIApi";

interface ReloadButtonProps {
  text: string;
  updateTags: (Tags: string[]) => void;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({ text, updateTags }) => {
  const [index, setIndex] = useState(1);

  const handleSubmit = async () => {
    try {
      const tagsReloadData = await createTags(text);
      if (index >= 3) {
        return alert("도약태그는 최대 3번까지 재설정 가능합니다.");
      } else {
        const tags = tagsReloadData;
        updateTags(tags);
        console.log("reload된 태그:", tags);
        setIndex(index + 1);
        console.log(index + "번째 호출");
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <Button onClick={handleSubmit}>
      <Image src={iconReload} alt="Reload" />
    </Button>
  );
};

export default ReloadButton;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  top: 0;
  min-width: 14px;
`;
