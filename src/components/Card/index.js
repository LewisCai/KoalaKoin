import React from 'react';
import './index.scss';

const Card = ({ title, content }) => {
  return (
    <div className="card">
      <h5 className="card-title">{title}</h5>
      <div className="card-content">
        {content}
      </div>
    </div>
  );
};

export default Card;
