import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
}

const getPages = (current: number, total: number) => {
  // Returns an array like [1, '...', 4, 5, 6, '...', 10]
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  if (current > 3) pages.push(1);
  if (current > 4) pages.push("...");
  for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); ++i) pages.push(i);
  if (current < total - 3) pages.push("...");
  if (current < total - 2) pages.push(total);
  return pages;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange, isDark }) => {
  const pages = getPages(page, totalPages);
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={`px-3 py-1 rounded font-semibold ${isDark ? "bg-[#2A4759] text-white" : "bg-[#e7e7e7] text-[#214A5A]"} ${page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F79B72] hover:text-white transition-colors"}`}
      >
        Prev
      </button>
      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded font-semibold ${p === page
              ? "bg-[#F79B72] text-white"
              : isDark
              ? "bg-[#2A4759] text-white hover:bg-[#F79B72] hover:text-white"
              : "bg-[#e7e7e7] text-[#214A5A] hover:bg-[#F79B72] hover:text-white"
            } transition-colors`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="px-2 text-[#aeb7be]">…</span>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={`px-3 py-1 rounded font-semibold ${isDark ? "bg-[#2A4759] text-white" : "bg-[#e7e7e7] text-[#214A5A]"} ${page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F79B72] hover:text-white transition-colors"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;