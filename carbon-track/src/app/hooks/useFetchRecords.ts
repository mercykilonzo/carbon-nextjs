import { useState, useEffect } from "react";
import { fetchRecords } from "@/app/utils/fetchRecords";

export default function useFetchRecords(page: number, pageSize: number) {
  const [records, setRecords] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchRecords(page, pageSize)
      .then(data => {
        setRecords(data.records);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      })
      .catch(() => {
        setRecords([]);
        setTotalPages(1);
        setTotalCount(0);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  return { records, totalPages, totalCount, loading };
}