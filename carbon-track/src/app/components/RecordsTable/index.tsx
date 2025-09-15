import React from "react";
import type { EnergyEntry } from "../../utils/fetchRecords";

interface RecordsTableProps {
  records: EnergyEntry[]; // Use imported type
  onEdit: (entry: EnergyEntry) => void;
  isDark: boolean;
}

function formatDate(dateString?: string) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toISOString().split("T")[0];
}

export default function RecordsTable({ records, onEdit, isDark }: RecordsTableProps) {
  const border = "border-white";
  const evenRow = "bg-[#2A4759]";
  const oddRow = "bg-gray-800";
  const cellText = "text-white";
  const headerBg = "bg-[#214A5A]";
  const headerText = "text-white";

  return (
    <table className={`w-full table-fixed border-collapse border ${border} rounded-b-md`}>
      <thead>
        <tr className={headerBg}>
          <th className={`p-3 py-4 border ${border} font-bold text-base ${headerText} text-left ${headerBg}`}>Energy type</th>
          <th className={`p-3 py-4 border ${border} font-bold text-base ${headerText} text-left ${headerBg}`}>Amount used</th>
          <th className={`p-3 py-4 border ${border} font-bold text-base ${headerText} text-left ${headerBg}`}>Tea Produced</th>
          <th className={`p-3 py-4 border ${border} font-bold text-base ${headerText} text-left ${headerBg}`}>Date</th>
          <th className={`p-3 py-4 border ${border} font-bold text-base ${headerText} text-left ${headerBg}`}>CO₂ emitted</th>
          <th className={`p-3 py-4 border ${border} font-bold text-base ${headerText} text-left ${headerBg}`}>Action</th>
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr>
            <td colSpan={6} className={`p-4 text-center ${evenRow} ${cellText}`}>No matching data found</td>
          </tr>
        ) : (
          records.map((entry, idx) => (
            <tr
              key={entry.data_id ?? idx}
              className={idx % 2 === 0 ? evenRow : oddRow}
            >
              <td className={`p-3 py-4 font-bold border ${border} ${cellText} text-left`}>{entry.energy_type}</td>
              <td className={`p-3 py-4 border ${border} ${cellText} text-left`}>{entry.energy_amount}</td>
              <td className={`p-3 py-4 border ${border} ${cellText} text-left`}>{entry.tea_processed_amount}</td>
              <td className={`p-3 py-4 border ${border} ${cellText} text-left`}>{formatDate(entry.created_at)}</td>
              <td className={`p-3 py-4 border ${border} ${cellText} text-left`}>{entry.co2_equivalent ?? "N/A"}</td>
              <td className={`p-3 py-4 border ${border} ${cellText} text-left`}>
                <button
                  onClick={() => onEdit(entry)}
                  className="text-[#F79B72] hover:text-[#c76c4c] font-semibold transition-colors cursor-pointer"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}