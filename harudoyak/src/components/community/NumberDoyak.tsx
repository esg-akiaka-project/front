import React from 'react';
import useCommunityStore from '../../store/useCommunityStore';

const NumberDoyak: React.FC = () => {
    const { doyakCount } = useCommunityStore();

    return <div>{doyakCount}</div>;
};

export default NumberDoyak;
1