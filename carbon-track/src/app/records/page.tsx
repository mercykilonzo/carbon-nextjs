"use client";
import React, { useState } from "react";
import PageHeader from "../sharedComponents/PageHeader";
import SearchBar from "../sharedComponents/SearchBar";
import Pagination from "../sharedComponents/Pagination";
import Button from "../sharedComponents/Button";
import RecordsTable from "../components/RecordsTable";
import ModalForm from "../components/ModalForm";
import { EnergyEntry, EnergyEntryFormData } from "../types";
import useRecords from "../components/useRecords";

export default function RecordsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDark, setIsDark] = useState(true); // Default to dark mode based on screenshot
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<EnergyEntry | null>(null);

  const { records, loading, totalPages } = useRecords({ search, page });

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

  const handleSubmit = (data: EnergyEntryFormData) => {
    // TODO: Save logic here
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? "bg-[#181e23]" : "bg-white"}`}>
      <PageHeader onToggleTheme={() => setIsDark(d => !d)} isDark={isDark} />
      <div className="mx-[2cm] my-0">
        <div className="flex flex-col gap-4 py-14">
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col">
              <h1 className={`text-4xl font-bold mb-1 ${isDark ? "text-white" : "text-[#214A5A]"}`}>Records</h1>
              <p className={`text-lg mb-2 ${isDark ? "text-gray-200" : "text-[#214A5A]"}`}>
                Data on energy consumption and production.
              </p>
              <div className="mt-2">
                <SearchBar value={search} onChange={setSearch} isDark={isDark} />
              </div>
            </div>
            <div className="flex items-start pt-2">
              <Button
                className="!bg-[#F79B72] !text-white font-bold px-10 py-4 text-2xl rounded-xl"
                onClick={handleCreate}
              >
                +Create
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <RecordsTable
              records={records}
              onEdit={handleEdit}
              isDark={isDark}
            />
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            isDark={isDark}
          />
        </div>
        <ModalForm
          open={modalOpen}
          onClose={handleModalClose}
          initialData={editing || undefined}
          onSubmit={handleSubmit}
          isDark={isDark}
        />
      </div>
    </div>
  );
}