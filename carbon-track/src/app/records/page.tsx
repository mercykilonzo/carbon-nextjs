"use client";
import React, { useState, useEffect } from "react";
import RecordsTable from "../components/RecordsTable";
import EmptyState from "../components/EmptyState";
import ModalForm from "../components/ModalForm";
import SuccessToast from "../components/SuccessToast";
import PageHeader from "../sharedComponents/PageHeader";
import { EnergyEntry, EnergyEntryFormData } from "@/types";
import { FiChevronLeft, FiChevronRight, FiFilter, FiChevronDown, FiChevronLeft as FiLeft, FiChevronRight as FiRight } from "react-icons/fi";

const MARGIN_SIDE_CM = 76;
const MARGIN_TOP_CM = 49;
const EMPTY_STATE_OFFSET_CM = 57;
const PAGINATION_OFFSET_CM = 38;
const SEARCH_HEIGHT = 48; 
const SEARCH_WIDTH = 260;

const FILTER_OPTIONS = [
  { label: "All Time", key: "all" },
  { label: "This Month", key: "this_month" },
  { label: "Last Month", key: "last_month" },
  { label: "This Quarter", key: "quarter" },
  { label: "This Year", key: "year" }
];

function getDateRange(option: string) {
  const now = new Date();
  let start: Date, end: Date;
  if (option === "last_month") {
    const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const last = new Date(now.getFullYear(), now.getMonth(), 0);
    start = first;
    end = last;
  } else if (option === "this_month") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  } else if (option === "year") {
    start = new Date(now.getFullYear(), 0, 1);
    end = new Date(now.getFullYear(), 11, 31);
  } else if (option === "quarter") {
    const quarter = Math.floor((now.getMonth() + 3) / 3);
    start = new Date(now.getFullYear(), (quarter - 1) * 3, 1);
    end = new Date(now.getFullYear(), quarter * 3, 0);
  } else {
    start = new Date(2000, 0, 1);
    end = now;
  }
  return { start, end };
}

const MOCK_RECORDS: EnergyEntry[] = [
  {
    data_id: "1",
    energy_type: "Electricity (Kwh)",
    energy_amount: "500",
    tea_processed_amount: "200",
    created_at: "2025-09-10",
    co2_equivalent: "30"
  },

];

export default function RecordsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(FILTER_OPTIONS[1].key);
  const [showFilter, setShowFilter] = useState(false);
  const { start, end } = getDateRange(filter);
  const [records, setRecords] = useState<EnergyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [pageInput, setPageInput] = useState(page);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<EnergyEntry | undefined>(undefined);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = MOCK_RECORDS;
      if (search.trim()) {
        filtered = filtered.filter(r =>
          r.energy_type?.toLowerCase().includes(search.toLowerCase())
        );
      }
      filtered = filtered.filter(r => {
        const date = new Date(r.created_at);
        return date >= start && date <= end;
      });
      const PAGE_SIZE = 7;
      const total = filtered.length;
      const startIdx = (page - 1) * PAGE_SIZE;
      const endIdx = startIdx + PAGE_SIZE;
      setRecords(filtered.slice(startIdx, endIdx));
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      setLoading(false);
    }, 300); 
  }, [search, page, filter, showSuccess]);


  const handleSubmit = (data: EnergyEntryFormData) => {
    setModalOpen(false);
    setToastMsg(editingEntry ? "Your record has been updated successfully." : "Your record has been saved successfully.");
    setEditingEntry(undefined);
    setShowSuccess(true);
    if (!editingEntry) {
      MOCK_RECORDS.push({ ...data, data_id: `${MOCK_RECORDS.length + 1}` });
    } else {
      const idx = MOCK_RECORDS.findIndex(r => r.data_id === editingEntry.data_id);
      if (idx !== -1) MOCK_RECORDS[idx] = { ...data, data_id: editingEntry.data_id };
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    setPageInput(1);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value.replace(/[^0-9]/g, ""));
    setPageInput(val);
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let newPage = pageInput;
      if (newPage < 1) newPage = 1;
      else if (newPage > totalPages) newPage = totalPages;
      setPage(newPage);
      setPageInput(newPage);
    }
  };

  const handleToggleTheme = () => {
    setIsDark((d) => !d);
    document.body.className = !isDark ? "bg-[#181e23]" : "bg-white";
  };

  function formatDate(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  return (
    <div className={`w-full flex min-h-screen ${isDark ? "bg-[#181e23]" : "bg-white"}`}>
      <div
        className="flex-1 flex flex-col items-center justify-start py-8"
        style={{
          paddingLeft: `${MARGIN_SIDE_CM}px`,
          paddingRight: `${MARGIN_SIDE_CM}px`,
        }}
      >
        <div className="w-full h-full">
          <div className="flex flex-row items-center justify-end mb-2 w-full">
            <PageHeader onToggleTheme={handleToggleTheme} isDark={isDark} />
          </div>
          <div style={{ marginTop: `${MARGIN_TOP_CM}px` }}>
            <div className="w-full flex flex-col items-start mb-6">
              <h1 className={`text-4xl font-bold mb-1 ${isDark ? "text-white" : "text-[#214A5A]"}`}>Records</h1>
              <p className={`text-lg ${isDark ? "text-gray-200" : "text-[#214A5A]"}`}>Data on energy consumption and production.</p>
            </div>
            <div className="flex flex-row items-center mb-8 w-full gap-4">
              <div className="relative" style={{ width: `${SEARCH_WIDTH}px`, height: `${SEARCH_HEIGHT}px` }}>
                <input
                  type="text"
                  placeholder=" Search reports..."
                  value={search}
                  onChange={handleSearchChange}
                  className={`
                    w-full h-full pl-10 pr-4 rounded text-xl focus:outline-none
                    border-2 border-[#e7e7e7]
                    bg-white text-[#214A5A]
                  `}
                  style={{ boxSizing: 'border-box', height: `${SEARCH_HEIGHT}px` }}
                />
                <svg
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 text-[#214A5A]`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  style={{ position: "absolute" }}
                >
                  <circle cx={11} cy={11} r={8} />
                  <line x1={21} y1={21} x2={16.65} y2={16.65} />
                </svg>
              </div>
              <div className="relative" style={{ height: `${SEARCH_HEIGHT}px` }}>
                <button
                  className="flex items-center gap-2 px-4 py-3 rounded bg-white border border-[#e7e7e7] text-[#214A5A] font-semibold cursor-pointer h-full"
                  onClick={() => setShowFilter((f) => !f)}
                  style={{ minWidth: "140px", height: `${SEARCH_HEIGHT}px` }}
                >
                  <FiFilter className="w-5 h-5" />
                  {FILTER_OPTIONS.find(o => o.key === filter)?.label}
                  <FiChevronDown className="ml-1 w-4 h-4" style={{ marginRight: "4px" }} />
                </button>
                {showFilter && (
                  <div className="absolute left-0 top-14 bg-white border border-[#e7e7e7] rounded shadow-md z-10 w-full">
                    {FILTER_OPTIONS.map(option => (
                      <div
                        key={option.key}
                        className={`px-4 py-3 text-[#214A5A] cursor-pointer
                          ${filter === option.key
                            ? "bg-[#214A5A] text-white"
                            : "hover:bg-[#e7e7e7]"}
                        `}
                        onClick={() => { setFilter(option.key); setShowFilter(false); }}
                        style={filter === option.key ? { pointerEvents: "none" } : {}}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center bg-white rounded px-4 py-3 border border-[#e7e7e7] text-[#214A5A] font-semibold min-w-[210px] h-full" style={{ height: `${SEARCH_HEIGHT}px` }}>
                <FiLeft className="w-5 h-5 cursor-pointer" />
                <span className="mx-2">{`${formatDate(start)} - ${formatDate(end)}`}</span>
                <FiRight className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="flex-1" />
              <button
                className={`font-bold py-3 px-8 rounded-lg text-2xl transition-colors cursor-pointer
                  bg-[#F79B72] text-[#214A5A] hover:bg-[#c76c4c]`}
                style={{ alignSelf: "flex-start", height: `${SEARCH_HEIGHT}px` }}
                onClick={() => {
                  setEditingEntry(undefined);
                  setModalOpen(true);
                }}
              >
                +Create
              </button>
            </div>
            <div className="w-full">
              {loading ? (
                <div className={`text-xl ${isDark ? "text-white" : "text-[#214A5A]"}`}>Loading...</div>
              ) : records.length === 0 ? (
                <div style={{ marginTop: EMPTY_STATE_OFFSET_CM }}>
                  <EmptyState onCreate={() => setModalOpen(true)} isDark={isDark} />
                </div>
              ) : (
                <>
                  <RecordsTable records={records} onEdit={entry => {
                    setEditingEntry(entry);
                    setModalOpen(true);
                  }} isDark={isDark} />
                  <div style={{ marginTop: `${PAGINATION_OFFSET_CM}px` }}>
                    <div className={`flex items-center justify-center gap-3 ${isDark ? "text-white" : "text-[#214A5A]"}`}>
                      <button
                        onClick={() => {
                          const newPage = Math.max(1, page - 1);
                          setPage(newPage);
                          setPageInput(newPage);
                        }}
                        disabled={page === 1}
                        className={`p-2 rounded cursor-pointer ${page === 1 ? "opacity-40" : "hover:bg-[#c76c4c]"}`}
                      >
                        <FiChevronLeft className="w-6 h-6" />
                      </button>
                      <span className="mx-2 flex items-center gap-2 text-lg">
                        Page
                        <input
                          type="number"
                          value={pageInput}
                          min={1}
                          max={totalPages}
                          onChange={handlePageInputChange}
                          onKeyDown={handlePageInputKeyDown}
                          className={`mx-1 w-14 bg-transparent border-b-2 border-[#F79B72] text-center outline-none text-lg cursor-pointer ${isDark ? "text-white" : "text-[#214A5A]"}`}
                          style={{ appearance: "none" }}
                        />
                        of <span className="font-bold">{totalPages}</span>
                      </span>
                      <button
                        onClick={() => {
                          const newPage = Math.min(totalPages, page + 1);
                          setPage(newPage);
                          setPageInput(newPage);
                        }}
                        disabled={page === totalPages}
                        className={`p-2 rounded cursor-pointer ${page === totalPages ? "opacity-40" : "hover:bg-[#c76c4c]"}`}
                      >
                        <FiChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <ModalForm
              open={modalOpen}
              onClose={() => {
                setModalOpen(false);
                setEditingEntry(undefined);
              }}
              initialData={editingEntry}
              onSubmit={handleSubmit}
              isDark={isDark}
            />
            {showSuccess && <SuccessToast message={toastMsg} onClose={() => setShowSuccess(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
}