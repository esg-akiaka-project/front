import React, { createContext, useContext } from "react";
import usePostData, { PostData } from "../hooks/usePostData";

interface PostDataContextType extends PostData {
  updateText: (newText: string) => void;
  updateEmotion: (newEmotion: number) => void;
  updateImage: (newImage: File | null) => void;
  updateTags: (newTags: string[]) => void;
}

const PostDataContext = createContext<PostDataContextType | undefined>(
  undefined,
);

export const PostDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    text,
    emotion,
    image,
    tags,
    updateText,
    updateEmotion,
    updateImage,
    updateTags,
  } = usePostData();

  return (
    <PostDataContext.Provider
      value={{
        text,
        emotion,
        image,
        tags,
        updateText,
        updateEmotion,
        updateImage,
        updateTags,
      }}
    >
      {children}
    </PostDataContext.Provider>
  );
};

export const usePostDataContext = () => {
  const context = useContext(PostDataContext);
  if (!context) {
    throw new Error(
      "usePostDataContext must be used within a PostDataProvider",
    );
  }
  return context;
};
