function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-12">

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`px-5 py-2 rounded-lg font-medium transition ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        ← Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`w-11 h-11 rounded-full font-semibold transition ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-white border hover:bg-blue-50"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`px-5 py-2 rounded-lg font-medium transition ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next →
      </button>

    </div>
  );
}

export default Pagination;