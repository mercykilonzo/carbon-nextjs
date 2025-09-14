import React from "react";
import { BsDatabaseFill } from "react-icons/bs";

const EmptyState = ({ onCreate, isDark }: { onCreate: () => void, isDark: boolean }) => (
  <div className="flex items-center justify-center w-full h-[410px]" style={{ marginTop: "76px" }}>
    <div className={`rounded-[16px] px-16 py-24 flex flex-col items-center w-full shadow-xl max-w-4xl ${isDark ? "bg-[#214A5A]" : "bg-[#e7e7e7]"}`}>
      <BsDatabaseFill className="text-[#F79B72] mb-8" size={100} />
      <p className={`text-2xl mb-8 text-center ${isDark ? "text-white" : "text-[#214A5A]"}`}>
        Log your energy consumption<br />
        and tea production to view your records here.
      </p>
      <button
        className="bg-[#F79B72] text-[#214A5A] font-bold py-4 px-16 rounded-lg text-2xl mt-6 hover:bg-[#c76c4c] transition-colors cursor-pointer"
        onClick={onCreate}
      >
        + Create
      </button>
    </div>
  </div>
);

export default EmptyState;