import { useState, useEffect } from "react";
import { EnergyEntry } from "@/types";
import { fetchRecords } from "@/app/utils/fetchRecords";

const PAGE_SIZE = 7;

interface UseRecordsProps {
  search: string;
  page: number;
}

export default function useRecords({ search, page }: UseRecordsProps) {
  const [records, setRecords] = useState<EnergyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getRecords = async () => {
      setLoading(true);
      const allRecords: EnergyEntry[] = await fetchRecords();
      let filtered = allRecords;
      if (search) {
        filtered = filtered.filter((r: EnergyEntry) =>
          r.energy_type?.toLowerCase().includes(search.toLowerCase())
        );
      }
      const total = filtered.length;
      const startIdx = (page - 1) * PAGE_SIZE;
      const endIdx = startIdx + PAGE_SIZE;
      setRecords(filtered.slice(startIdx, endIdx));
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      setLoading(false);
    };
    getRecords();
  }, [search, page]);

  return { records, loading, totalPages };
}