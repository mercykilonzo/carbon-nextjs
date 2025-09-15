"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "../sharedComponents/PageHeader";
import SearchBar from "../sharedComponents/SearchBar";
import Pagination from "../sharedComponents/Pagination";
import Button from "../sharedComponents/Button";
import DatePicker from "../sharedComponents/DatePicker";
import RecordsTable from "../components/RecordsTable";
import ModalForm from "../components/ModalForm";
import EmptyState from "../components/EmptyState";
import SuccessToast from "../sharedComponents/SuccessToast";
import {
  fetchRecords,
  createRecord,
  updateRecord,
  EnergyEntry,
} from "../utils/fetchRecords";

interface EnergyEntryFormData {
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
}

export default function RecordsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDark, setIsDark] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<EnergyEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [records, setRecords] = useState<EnergyEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const PAGE_SIZE = 7;
  const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));

  // Fetch records from backend API
  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await fetchRecords();
      setRecords(data);
    } catch (e) {
      setToast("Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtering
  const filteredRecords = records.filter((rec) => {
    // Optionally, filter by selected date here as well
    const searchVal = search.trim().toLowerCase();
    if (!searchVal) return true;
    // You can expand this to search other fields as needed
    return (
      rec.energy_type.toLowerCase().includes(searchVal) ||
      rec.energy_amount.toLowerCase().includes(searchVal) ||
      rec.tea_processed_amount.toLowerCase().includes(searchVal)
    );
  });

  // Pagination logic
  const paginatedRecords = filteredRecords.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const filteredPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));

  // Pagination correction
  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1) setPage(1);
    else if (nextPage > filteredPages) setPage(filteredPages);
    else setPage(nextPage);
  };

  // Handlers
  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (entry: EnergyEntry) => {
    setEditing(entry);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (formData: EnergyEntryFormData) => {
    try {
      if (editing && editing.data_id) {
        await updateRecord(editing.data_id, formData);
        setToast("Record updated successfully!");
      } else {
        await createRecord(formData);
        setToast("Record saved successfully!");
      }
      setModalOpen(false);
      setEditing(null);
      await loadRecords();
    } catch (e) {
      setToast("Failed to save record.");
    }
  };

  // 2cm down for all except sidebar
  const contentStyle: React.CSSProperties = { marginTop: "2cm" };

  return (
    <div className={`min-h-screen w-full ${isDark ? "bg-[#181e23]" : "bg-white"}`}>
      <div className="mx-[2cm]" style={contentStyle}>
        <PageHeader onToggleTheme={() => setIsDark((d) => !d)} isDark={isDark} />
        <div className="pt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2 mb-2">
            <h1 className={`text-4xl font-bold ${isDark ? "text-white" : "text-[#214A5A]"}`}>
              Records
            </h1>
            <p className={`text-lg ${isDark ? "text-gray-200" : "text-[#214A5A]"}`}>
              Data on energy consumption and production.
            </p>
          </div>
          <div className="flex flex-row items-center gap-3 mb-6">
            <SearchBar value={search} onChange={setSearch} isDark={isDark} />
            <div style={{ width: "1cm" }} /> {/* 1cm spacing */}
            <DatePicker selected={selectedDate} onChange={setSelectedDate} isDark={isDark} />
            <div className="flex-1" />
            <Button
              className="!bg-[#F79B72] !text-white font-bold px-10 py-4 text-2xl rounded-xl"
              onClick={handleCreate}
            >
              +Create
            </Button>
          </div>
          {paginatedRecords.length === 0 && !loading ? (
            <EmptyState onCreate={handleCreate} isDark={isDark} />
          ) : (
            <>
              <RecordsTable
                records={paginatedRecords}
                onEdit={handleEdit}
                isDark={isDark}
              />
              <Pagination
                page={page}
                totalPages={filteredPages}
                onPageChange={handlePageChange}
                isDark={isDark}
              />
            </>
          )}
        </div>
        <ModalForm
          open={modalOpen}
          onClose={handleModalClose}
          initialData={editing || undefined}
          onSubmit={handleSubmit}
          isDark={isDark}
        />
        {toast && (
          <SuccessToast
            message={toast}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}