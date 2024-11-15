import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import iconReload from "../../../public/assets/common/icon_reload.svg";
import Image from "next/image";

interface ReloadButtonProps {
  text: string;
  tags: string[];
  updateTags: (Tags: string[]) => void;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({
  text,
  tags,
  updateTags,
}) => {
  const [index, setIndex] = useState(1);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/openai/keywords", { text });

      if (response.status === 200) {
        if (index >= 3) {
          return alert("도약태그는 최대 3번까지 재설정 가능합니다.");
        } else {
          const tags = response.data.keywords;
          updateTags(tags);
          console.log(tags);
        }
      } else {
        console.error("태그 키워드를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("error: ", error);
    }
    setIndex(index + 1);
    console.log(index + "번째 호출");
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
`;
