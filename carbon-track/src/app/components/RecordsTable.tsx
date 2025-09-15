import React from "react";
import { EnergyEntry } from "../types";

interface RecordsTableProps {
  records: EnergyEntry[];
  onEdit: (entry: EnergyEntry) => void;
  isDark: boolean;
}

export default function RecordsTable({ records, onEdit, isDark }: RecordsTableProps) {
  // Colors chosen to match your screenshot as closely as possible
  const headerColor = isDark ? "bg-[#1691a5]" : "bg-[#e7e7e7]";
  const headerText = isDark ? "text-white" : "text-[#214A5A]";
  const borderColor = isDark ? "border-black" : "border-[#214A5A]";
  const rowColors = isDark
    ? ["bg-[#1a2734]", "bg-[#223142]"]
    : ["bg-white", "bg-[#e7e7e7]"];
  const cellText = "text-white"; // Always white in dark mode, can adapt for light

  return (
    <table className={`w-full table-fixed border-collapse border ${borderColor} rounded-b-md`}>
      <thead>
        <tr className={`${headerColor} ${headerText}`}>
          <th className={`p-3 border ${borderColor} font-bold text-base`}>Energy type</th>
          <th className={`p-3 border ${borderColor} font-bold text-base`}>Amount used</th>
          <th className={`p-3 border ${borderColor} font-bold text-base`}>Tea Produced</th>
          <th className={`p-3 border ${borderColor} font-bold text-base`}>Date</th>
          <th className={`p-3 border ${borderColor} font-bold text-base`}>CO₂ emitted</th>
          <th className={`p-3 border ${borderColor} font-bold text-base`}>Action</th>
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr>
            <td colSpan={6} className={`p-4 text-center ${rowColors[0]} ${cellText}`}>No matching data found</td>
          </tr>
        ) : (
          records.map((entry, idx) => (
            <tr
              key={entry.data_id ?? idx}
              className={`${rowColors[idx % 2]}`}
            >
              <td className={`p-3 font-bold border ${borderColor} ${cellText}`}>{entry.energy_type}</td>
              <td className={`p-3 border ${borderColor} ${cellText}`}>{entry.energy_amount}</td>
              <td className={`p-3 border ${borderColor} ${cellText}`}>{entry.tea_processed_amount}</td>
              <td className={`p-3 border ${borderColor} ${cellText}`}>{entry.created_at}</td>
              <td className={`p-3 border ${borderColor} ${cellText}`}>{entry.co2_equivalent}</td>
              <td className={`p-3 border ${borderColor} ${cellText}`}>
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