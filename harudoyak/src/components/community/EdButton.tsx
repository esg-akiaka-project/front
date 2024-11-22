import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { editPost } from "@/src/apis/seoroApi";
import { useUserStore } from "@/src/store/useUserStore";

interface EditConfirmButtonProps {
  shareDoyakId: number;
  shareContent: string;
}

const EdButton: React.FC<EditConfirmButtonProps> = ({ shareDoyakId, shareContent }) => {
  const router = useRouter();
  const {memberId} = useUserStore();
  
  const handleEditConfirm = async () => {
    if(memberId === null) {
      console.error("memberId가 없습니다. 로그인을 확인해주세요");
       alert("로그인이 필요합니다."); 
       return;
    }
    
    try {
      if (!shareDoyakId || !shareContent) {
        console.error("필수 데이터가 누락되었습니다!");
        alert("내용을 입력해주세요!");
        return;
      }

      // 수정 API 호출
      const updatedPost = await editPost(memberId, shareDoyakId, shareContent);
      console.log("수정된 게시글:", updatedPost);
      alert("게시글이 수정되었습니다!");
      router.push("/community");
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <ButtonContainer>
      <Button onClick={handleEditConfirm}>
        수정 완료!
      </Button>
    </ButtonContainer>
  );
};

export default EdButton;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const Button = styled.button`
  width: 90%;
  max-width: 300px;
  height: 40px;
  font-size: 16px;
  color: white;
  background-color: var(--sub-green3);
  border: none;
  border-radius: 24px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: var(--sub-green2);
  }
`;
