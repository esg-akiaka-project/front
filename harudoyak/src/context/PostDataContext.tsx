import React, { createContext, useContext } from "react";
import usePostData, { PostData } from "../hooks/usePostData";

export interface PostDataContextType extends PostData {
  updateText: (newText: string) => void;
  updateEmotion: (newEmotion: string) => void;
  updateImage: (newImage: string | null) => void;
  updateTags: (newTags: string[]) => void;
  resetPostData: () => void;
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

  const resetPostData = () => {
    updateEmotion("");
    updateImage(null);
    updateTags([]);
    updateText("");
  };

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
        resetPostData,
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
