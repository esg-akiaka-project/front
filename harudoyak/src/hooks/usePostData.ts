// hooks/usePostData.ts
import { useState } from 'react';

export interface PostData {
  emotion: string;
  text: string;
  image: string | null;
  tags: string[];
}

const usePostData = () => {
  const [emotion, setEmotion] = useState<string>("");
  const [text, setText] = useState<string>('');
  const [prevText, setPrevText] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // 감정 업데이트 함수
  const updateEmotion = (newEmotion: string) => setEmotion(newEmotion);

  // 텍스트 업데이트 함수
  const updateText = (newText: string) => setText(newText);

  // 이미지 업데이트 함수
  const updateImage = (newImage: string | null) => setImage(newImage);

   // 태그 업데이트 함수
  const updateTags = (newTags: string[]) => setTags(newTags);

  const updatePrevText = (newPrevText: string) => setPrevText(newPrevText);


  return {
    text,
    prevText,
    image,
    emotion,
    tags,
    updateText,
    updatePrevText,
    updateImage,
    updateEmotion,
    updateTags
  };
};

export default usePostData;
