import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface EnergyEntryFormData {
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
}

interface EnergyEntry extends EnergyEntryFormData {
  data_id?: string;
  created_at?: string;
  co2_equivalent?: string;
}

const ENERGY_OPTIONS = [
  "Electricity (Kwh)",
  "Firewood (Kg)",
  "Diesel (Litre)",
  "Solar (Kwh)",
];

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: EnergyEntry;
  onSubmit: (data: EnergyEntryFormData) => void;
  isDark: boolean;
}

const ModalForm: React.FC<ModalFormProps> = ({
  open,
  onClose,
  initialData,
  onSubmit,
  isDark,
}) => {
  const [energyType, setEnergyType] = useState(ENERGY_OPTIONS[0]);
  const [energyAmount, setEnergyAmount] = useState("");
  const [teaProduced, setTeaProduced] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) {
      setEnergyType(initialData.energy_type);
      setEnergyAmount(initialData.energy_amount);
      setTeaProduced(initialData.tea_processed_amount);
    } else {
      setEnergyType(ENERGY_OPTIONS[0]);
      setEnergyAmount("");
      setTeaProduced("");
    }
  }, [open, initialData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className={`rounded-xl shadow-2xl w-full max-w-lg flex flex-col gap-3 px-10 py-10 ${
          isDark ? "bg-[#214A5A]" : "bg-[#e7e7e7]"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDark ? "text-white" : "text-[#214A5A]"
          }`}
        >
          {initialData ? "Edit Energy Consumption" : "Log Energy Consumption"}
        </h2>
        <p
          className={`mb-6 text-lg font-medium ${
            isDark ? "text-gray-200" : "text-[#214A5A]"
          }`}
        >
          Enter the factory’s energy usages
        </p>
        <form
          className="flex flex-col gap-6"
          onSubmit={e => {
            e.preventDefault();
            onSubmit({
              energy_type: energyType,
              energy_amount: energyAmount,
              tea_processed_amount: teaProduced,
            });
          }}
        >
          <div>
            <label
              className={`block mb-2 text-lg font-medium ${
                isDark ? "text-white" : "text-[#214A5A]"
              }`}
            >
              Energy Type
            </label>
            <div className="relative">
              <select
                value={energyType}
                onChange={e => setEnergyType(e.target.value)}
                className={`w-full rounded px-4 py-3 pr-10 ${
                  isDark
                    ? "bg-[#13303A] text-white"
                    : "bg-[#e7e7e7] text-[#214A5A]"
                } text-lg focus:outline-none cursor-pointer appearance-none`}
                style={{ minWidth: 0 }}
              >
                {ENERGY_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <FiChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-white" : "text-[#214A5A]"} pointer-events-none`} />
            </div>
          </div>
          <div>
            <label
              className={`block mb-2 text-lg font-medium ${
                isDark ? "text-white" : "text-[#214A5A]"
              }`}
            >
              Amount used
            </label>
            <input
              type="number"
              value={energyAmount}
              onChange={e => setEnergyAmount(e.target.value)}
              className={`w-full rounded px-4 py-3 ${
                isDark
                  ? "bg-[#13303A] text-white"
                  : "bg-[#e7e7e7] text-[#214A5A]"
              } text-lg focus:outline-none cursor-pointer`}
              placeholder="0"
              required
            />
          </div>
          <div>
            <label
              className={`block mb-2 text-lg font-medium ${
                isDark ? "text-white" : "text-[#214A5A]"
              }`}
            >
              Tea Produced
            </label>
            <input
              type="number"
              value={teaProduced}
              onChange={e => setTeaProduced(e.target.value)}
              className={`w-full rounded px-4 py-3 ${
                isDark
                  ? "bg-[#13303A] text-white"
                  : "bg-[#e7e7e7] text-[#214A5A]"
              } text-lg focus:outline-none cursor-pointer`}
              placeholder="Amount in kgs"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-[#F79B72] text-white font-bold py-4 rounded-lg text-xl hover:bg-[#c76c4c] transition-colors cursor-pointer"
          >
            {initialData ? "Update Record" : "Log Consumption"}
          </button>
          <button
            type="button"
            className="mt-2 text-gray-400 text-base hover:text-[#c76c4c] transition-colors cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;