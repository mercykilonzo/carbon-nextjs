import React from "react";
import { FiSearch, FiCalendar } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  isDark: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, isDark }) => (
  <div className={`flex items-center gap-2 rounded-md px-3 py-2 w-[320px] ${isDark ? "bg-[#23272b]" : "bg-[#e7e7e7]"}`}>
    <FiSearch className={`w-5 h-5 ${isDark ? "text-[#aeb7be]" : "text-[#214A5A]"}`} />
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`flex-1 bg-transparent outline-none text-base placeholder:italic placeholder:text-[#aeb7be] ${isDark ? "text-white" : "text-[#214A5A]"}`}
      placeholder="Search"
    />
    <FiCalendar className={`w-5 h-5 ${isDark ? "text-[#aeb7be]" : "text-[#214A5A]"}`} />
  </div>
);

export default SearchBar;