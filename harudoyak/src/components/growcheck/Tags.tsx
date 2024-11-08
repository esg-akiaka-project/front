import React from "react";
import styled from "styled-components";

interface TagsProps {
  tags: string[];
}
const Tags: React.FC<TagsProps> = ({ tags }) => {
  const truncateTag = (tag: string) => {
    return tag.length > 4 ? `${tag.slice(0, 4)}...` : tag;
  };

  return (
    <TagContainer>
      {tags.map((tag, index) => (
        <TagBox key={index} isIndented={Math.floor(index / 4) % 2 === 1}>
          #<TagText>{truncateTag(tag)}</TagText>
        </TagBox>
      ))}
    </TagContainer>
  );
};
export default Tags;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TagBox = styled.div<{ isIndented: boolean }>`
  background-color: white;
  color: #2e7d32;
  // border: 1px solid #2e7d32;
  box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem #e8ebe9;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 6rem;
  overflow: hidden;
  white-space: nowrap;
  margin-left: ${({ isIndented }) => (isIndented ? "1.5rem" : "0")};
`;

const TagText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
