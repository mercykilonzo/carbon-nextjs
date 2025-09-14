import React from "react";
import { EnergyEntry } from "@/types";

interface RecordsTableProps {
  records: EnergyEntry[];
  onEdit: (entry: EnergyEntry) => void;
  isDark: boolean;
}

const headerStyle = "px-6 py-4 text-left text-base font-bold border-r";
const cellStyle = "px-6 py-4 text-left border-r align-middle whitespace-nowrap";

const RecordsTable: React.FC<RecordsTableProps> = ({ records, onEdit, isDark }) => (
  <div className="w-full">
    <table className={`w-full rounded-xl border ${isDark ? "bg-[#214A5A] border-[#e7e7e7]" : "bg-[#e7e7e7] border-[#214A5A]"}`}>
      <thead>
        <tr>
          <th className={`${headerStyle} ${isDark ? "text-white bg-[#214A5A] border-[#e7e7e7]" : "text-[#214A5A] bg-[#e7e7e7] border-[#214A5A]"}`}>Energy type</th>
          <th className={`${headerStyle} ${isDark ? "text-white bg-[#214A5A] border-[#e7e7e7]" : "text-[#214A5A] bg-[#e7e7e7] border-[#214A5A]"}`}>Amount used</th>
          <th className={`${headerStyle} ${isDark ? "text-white bg-[#214A5A] border-[#e7e7e7]" : "text-[#214A5A] bg-[#e7e7e7] border-[#214A5A]"}`}>Tea Produced</th>
          <th className={`${headerStyle} ${isDark ? "text-white bg-[#214A5A] border-[#e7e7e7]" : "text-[#214A5A] bg-[#e7e7e7] border-[#214A5A]"}`}>Date</th>
          <th className={`${headerStyle} ${isDark ? "text-white bg-[#214A5A] border-[#e7e7e7]" : "text-[#214A5A] bg-[#e7e7e7] border-[#214A5A]"}`}>Co2 emitted</th>
          <th className={`${headerStyle} border-r-0 ${isDark ? "text-white bg-[#214A5A] border-[#e7e7e7]" : "text-[#214A5A] bg-[#e7e7e7] border-[#214A5A]"}`}>Action</th>
        </tr>
        <tr>
          <td colSpan={6} className={`border-b-4 ${isDark ? "border-[#F79B72]" : "border-[#214A5A]"} p-0`}></td>
        </tr>
      </thead>
      <tbody>
        {records.map((entry, idx) => (
          <tr
            key={entry.data_id ?? idx}
            className={`${isDark ? "bg-[#214A5A] hover:bg-[#13303A]" : "bg-[#e7e7e7] hover:bg-[#c7c7c7]"} transition-colors`}
          >
            <td className={cellStyle + (isDark ? " text-white font-semibold border-[#e7e7e7]" : " text-[#214A5A] font-semibold border-[#214A5A]")}>{entry.energy_type}</td>
            <td className={cellStyle + (isDark ? " text-white border-[#e7e7e7]" : " text-[#214A5A] border-[#214A5A]")}>{entry.energy_amount}</td>
            <td className={cellStyle + (isDark ? " text-white border-[#e7e7e7]" : " text-[#214A5A] border-[#214A5A]")}>{entry.tea_processed_amount}</td>
            <td className={cellStyle + (isDark ? " text-white border-[#e7e7e7]" : " text-[#214A5A] border-[#214A5A]")}>{entry.created_at}</td>
            <td className={cellStyle + (isDark ? " text-white border-[#e7e7e7]" : " text-[#214A5A] border-[#214A5A]")}>{entry.co2_equivalent}</td>
            <td className={cellStyle + " border-r-0"}>
              <button
                onClick={() => onEdit(entry)}
                className="text-[#F79B72] hover:text-[#c76c4c] font-semibold transition-colors cursor-pointer"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RecordsTable;