import React from "react";
import "./index.scss";

const Pagination = ({ currentPage, totalPages, onBack, onNext }) => {
  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={onBack} disabled={currentPage === 0}>
        Go Back
      </button>
      <div className="page-indicators">
        {Array.from({ length: totalPages }, (_, index) => (
          <div key={index} className={`page-indicator ${index === currentPage ? 'active' : ''}`} />
        ))}
      </div>
      <button className="pagination-button" onClick={onNext} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
