export interface EnergyEntry {
  data_id?: string;
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
  created_at: string;
  co2_equivalent: string;
}

export interface EnergyEntryFormData {
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
  created_at: string;
  co2_equivalent: string;
}