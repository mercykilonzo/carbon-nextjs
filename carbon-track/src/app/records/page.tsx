"use client";
import React, { useState } from "react";
import SideBarFactory from "@/app/sharedComponents/SideBarFactory";
import PageHeader from "@/app/sharedComponents/PageHeader";
import ModalForm from "@/app/components/ModalForm";
import RecordsTable from "@/app/components/RecordsTable";
import Pagination from "@/app/sharedComponents/Pagination";
import useFetchRecords from "@/app/hooks/useFetchRecords";
import { saveRecord, updateRecord } from "@/app/utils/fetchRecords";
import Button from "@/app/sharedComponents/Button";
import { FiPlus } from "react-icons/fi";

export default function RecordsPage() {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { records, totalPages, loading } = useFetchRecords(page, pageSize);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);

  const handleEdit = (record: any) => {
    setEditRecord(record);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditRecord(null);
    setModalOpen(true);
  };

  const handleSave = async (data: any) => {
    if (editRecord) {
      return await updateRecord(editRecord.id, data);
    } else {
      return await saveRecord(data);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <SideBarFactory />
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <PageHeader />
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 flex flex-col justify-between flex-1 bg-[#e7e7e7] dark:bg-[#183040] transition-colors min-h-0"
             style={{ minHeight: 0 }}>
          <div className="flex flex-row justify-between items-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#2A4759] dark:text-[#F8B88F]">Energy Consumption Records</h2>
            <Button
              buttonText="Add Record"
              variant="create"
              icon={<FiPlus />}
              onclickHandler={handleAdd}
            />
          </div>
          <div className="flex-1 min-h-0">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <span className="text-[#2A4759] dark:text-[#F8B88F]">Loading...</span>
              </div>
            ) : (
              <RecordsTable records={records} onEdit={handleEdit} />
            )}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </main>
      {modalOpen && (
        <ModalForm
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editRecord || undefined}
        />
      )}
    </div>
  );
}