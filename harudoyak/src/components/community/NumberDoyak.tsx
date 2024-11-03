import React from 'react';

interface NumberDoyakProps {
    count: number;
}

const NumberDoyak: React.FC<NumberDoyakProps> = ({ count }) => {
    return <div>{count}</div>;
};

export default NumberDoyak;
