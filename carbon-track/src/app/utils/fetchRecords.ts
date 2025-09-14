export async function fetchRecords() {
  const response = await fetch("https://carbon-track-680e7cff8d27.herokuapp.com/api/energy_entries/");
  if (!response.ok) throw new Error("Failed to fetch records");
  return await response.json();
}