import React from "react";
import styled from "styled-components";
import Tag from './Tag';

interface TagsProps {
  tagslist: string[];
}

const Tags: React.FC<TagsProps> = ({ tagslist }) => {
  return (
    <Wrapper>
      {tagslist.map((tag, index)=> (
        <Tag key={index}>{tag}</Tag>
      ))}
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;