import React from "react";

type RecordType = {
  id: number;
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
  created_at: string;
};

interface RecordsTableProps {
  records: RecordType[];
  onEdit: (record: RecordType) => void;
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records, onEdit }) => (
  <div className="overflow-x-auto">
    <table className="w-full rounded-lg overflow-hidden border-collapse bg-white dark:bg-[#23313a]">
      <thead>
        <tr className="bg-[#2A4759] text-white dark:bg-[#F8B88F] dark:text-[#2A4759]">
          <th className="p-3">Energy Type</th>
          <th className="p-3">Energy Amount</th>
          <th className="p-3">Tea Processed</th>
          <th className="p-3">Date</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr>
            <td colSpan={5} className="p-6 text-center text-[#2A4759] dark:text-[#F8B88F]">
              No records found.
            </td>
          </tr>
        ) : (
          records.map((record) => (
            <tr key={record.id} className="border-b border-gray-200 dark:border-[#2A4759] hover:bg-[#F8B88F] dark:hover:bg-[#2A4759] transition">
              <td className="p-3 text-[#2A4759] dark:text-[#F8B88F]">{record.energy_type}</td>
              <td className="p-3 text-[#2A4759] dark:text-[#F8B88F]">{record.energy_amount}</td>
              <td className="p-3 text-[#2A4759] dark:text-[#F8B88F]">{record.tea_processed_amount}</td>
              <td className="p-3 text-[#2A4759] dark:text-[#F8B88F]">{new Date(record.created_at).toLocaleString()}</td>
              <td className="p-3">
                <button
                  className="bg-[#F79B72] text-white px-3 py-2 rounded-lg hover:bg-[#2A4759] dark:bg-[#2A4759] dark:text-white dark:hover:bg-[#F8B88F] dark:hover:text-[#2A4759] transition"
                  onClick={() => onEdit(record)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default RecordsTable;