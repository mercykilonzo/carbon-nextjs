import { useState, useEffect } from "react";
import { fetchRecords, EnergyEntry } from "../utils/fetchRecords";

const PAGE_SIZE = 7;

interface UseRecordsProps {
  search: string;
  page: number;
}

export default function useFetchRecords({ search, page }: UseRecordsProps) {
  const [records, setRecords] = useState<EnergyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getRecords = async () => {
      setLoading(true);
      try {
        const allRecords: EnergyEntry[] = await fetchRecords();
        let filtered = allRecords;
        if (search) {
          const s = search.toLowerCase();
          filtered = filtered.filter(
            (r: EnergyEntry) =>
              r.energy_type?.toLowerCase().includes(s) ||
              r.energy_amount?.toLowerCase().includes(s) ||
              r.tea_processed_amount?.toLowerCase().includes(s)
          );
        }
        const total = filtered.length;
        const startIdx = (page - 1) * PAGE_SIZE;
        const endIdx = startIdx + PAGE_SIZE;
        setRecords(filtered.slice(startIdx, endIdx));
        setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      } catch (e) {
        setRecords([]);
        setTotalPages(1);
      }
      setLoading(false);
    };
    getRecords();
  }, [search, page]);

  return { records, loading, totalPages };
}