const BASE_URL = "https://carbon-track-680e7cff8d27.herokuapp.com/api/energy_entries/";

export interface EnergyEntry {
  data_id?: string;
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
  created_at: string; 
  co2_equivalent?: string;
}

// Fetch all records
export async function fetchRecords(): Promise<EnergyEntry[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch records");
  return await response.json();
}

// Create a new record
export async function createRecord(data: {
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
}): Promise<EnergyEntry> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create record");
  return await response.json();
}

// Update an existing record
export async function updateRecord(
  data_id: string,
  data: {
    energy_type: string;
    energy_amount: string;
    tea_processed_amount: string;
  }
): Promise<EnergyEntry> {
  const response = await fetch(`${BASE_URL}${data_id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update record");
  return await response.json();
}