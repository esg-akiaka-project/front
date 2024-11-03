import React from 'react';
import useCommunityStore from '../../store/useCommunityStore';

const NumberComment: React.FC = () => {
    const { commentCount } = useCommunityStore();

    return <div>{commentCount}</div>;
};

export default NumberComment;
