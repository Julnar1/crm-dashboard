import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/main.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          2,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
        style={{ cursor: currentPage === 1 ? "default" : "pointer" }}
      >
        <i className="bi bi-arrow-left"></i> Previous
      </button>
      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => page !== currentPage && onPageChange(page)}
            className="pagination-page-link"
            style={{
              background: page === currentPage ? "#6c63ff" : "none",
              color: page === currentPage ? "white" : "#222",
              cursor: page === currentPage ? "default" : "pointer",
            }}
            disabled={page === currentPage}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button-transparent"
        style={{ cursor: currentPage === totalPages ? "default" : "pointer" }}
      >
        Next <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
