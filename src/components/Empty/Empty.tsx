import React from 'react';
import './_empty.scss';

interface Props {
  message: string;
}

const Empty: React.FC<Props> = ({ message }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#9A9FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 16V24" stroke="#9A9FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 32H24.01" stroke="#9A9FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Empty;