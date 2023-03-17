import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="flex items-center">
        {pageNumbers.map((number) => (
          <a
            key={number}
            onClick={() => paginate(number)}
            href="/feed#"
            className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2 mt-5 mb-36"
          >
            {number}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
