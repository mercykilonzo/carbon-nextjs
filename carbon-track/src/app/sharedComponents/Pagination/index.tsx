import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(currentPage.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleInputBlur = () => {
    let pageNum = parseInt(inputValue, 10);
    if (isNaN(pageNum) || pageNum < 1) pageNum = 1;
    if (pageNum > totalPages) pageNum = totalPages;
    setInputValue(pageNum.toString());
    onPageChange(pageNum);
  };

  return (
    <div className="flex items-center gap-2 justify-center py-6">
      <button
        className="px-4 py-2 rounded bg-[#2A4759] text-white dark:bg-[#F8B88F] dark:text-[#2A4759] hover:bg-[#F79B72] dark:hover:bg-[#2A4759] font-bold transition"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="w-12 text-center rounded border border-gray-300 dark:border-[#F8B88F] bg-[#e7e7e7] dark:bg-[#23313a] text-[#2A4759] dark:text-[#F8B88F] font-bold"
      />
      <span className="text-[#2A4759] dark:text-[#F8B88F]">/ {totalPages}</span>
      <button
        className="px-4 py-2 rounded bg-[#2A4759] text-white dark:bg-[#F8B88F] dark:text-[#2A4759] hover:bg-[#F79B72] dark:hover:bg-[#2A4759] font-bold transition"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;