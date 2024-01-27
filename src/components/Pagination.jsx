import React from "react";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePagination,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const DisplayButtons = () => {
    const page_buttons = [];

    page_buttons.push(
      <button
        key="previous"
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
    );

    for (let page = 1; page <= totalPages; page++) {
      page_buttons.push(
        <button
          key={page}
          onClick={() => handlePagination(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      );
    }

    page_buttons.push(
      <button
        key="next"
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return page_buttons;
  };

  return <div className="pagination">{DisplayButtons()}</div>;
};

export default Pagination;
