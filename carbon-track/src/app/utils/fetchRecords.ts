export async function fetchRecords(page: number, pageSize: number) {
  // Adapt this to your actual API endpoint
  const res = await fetch(`/api/energy_entries/?page=${page}&page_size=${pageSize}`);
  if (!res.ok) throw new Error("Failed to fetch records");
  const data = await res.json();
  return {
    records: data.results || [],
    totalPages: data.total_pages || 1,
    totalCount: data.count || 0,
  };
}

export async function saveRecord(record: any) {
  const res = await fetch("/api/energy_entries/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  if (!res.ok) {
    const err = await res.json();
    return { success: false, message: err?.detail || "Failed to save record", type: "error" };
  }
  return { success: true, message: "Record saved!", type: "success" };
}

export async function updateRecord(id: number, record: any) {
  const res = await fetch(`/api/energy_entries/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  if (!res.ok) {
    const err = await res.json();
    return { success: false, message: err?.detail || "Failed to update record", type: "error" };
  }
  return { success: true, message: "Record updated!", type: "success" };
}