import React from "react";

export default function Pagination({ goToPrevPage, goToNextPage }) {
  return (
    <div>
      {goToPrevPage && <button onClick={goToPrevPage}>Previous </button>}
      {goToNextPage && <button onClick={goToNextPage}>Next </button>}
    </div>
  );
}
