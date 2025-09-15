import React, { useState, useEffect } from "react";
import Button from "@/app/sharedComponents/Button";
import { FiPlus } from "react-icons/fi";
import SuccessToast from "@/app/sharedComponents/SuccessToast";

type FormDataType = {
  energy_type: string;
  energy_amount: string;
  tea_processed_amount: string;
};

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormDataType) => Promise<{ success: boolean; message: string; type?: "success" | "error" }>;
  initialData?: FormDataType;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<FormDataType>(initialData || {
    energy_type: "",
    energy_amount: "",
    tea_processed_amount: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await onSave({ ...formData });
    setToast({ message: result.message, type: result.type || "success" });
    if (result.success) {
      setIsDirty(false);
      setTimeout(() => {
        setToast(null);
        onClose();
      }, 1200);
    } else {
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 transition">
      <div className="bg-white dark:bg-[#23313a] rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2A4759] dark:text-[#F8B88F] hover:text-[#F79B72] dark:hover:text-[#F79B72] text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-6 text-[#2A4759] dark:text-[#F8B88F]">
          {initialData ? "Update Record" : "Log Consumption"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="energy_type"
            value={formData.energy_type}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:border-[#2A4759] bg-[#F8B88F] dark:bg-[#2A4759] text-[#2A4759] dark:text-[#F8B88F]"
          >
            <option value="" disabled>
              Select Energy Type
            </option>
            <option value="electricity">Electricity</option>
            <option value="fuel">Fuel</option>
          </select>
          <input
            type="text"
            name="energy_amount"
            value={formData.energy_amount}
            onChange={handleChange}
            placeholder="Energy Amount"
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:border-[#2A4759] bg-[#F8B88F] dark:bg-[#2A4759] text-[#2A4759] dark:text-[#F8B88F]"
          />
          <input
            type="text"
            name="tea_processed_amount"
            value={formData.tea_processed_amount}
            onChange={handleChange}
            placeholder="Tea Processed Amount"
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:border-[#2A4759] bg-[#F8B88F] dark:bg-[#2A4759] text-[#2A4759] dark:text-[#F8B88F]"
          />
          <Button
            buttonText={initialData ? "Update Record" : "Log Consumption"}
            variant="create"
            icon={!initialData && <FiPlus />}
            type="submit"
            disabled={!isDirty}
          />
        </form>
        {toast && <SuccessToast message={toast.message} type={toast.type} />}
      </div>
    </div>
  );
};

export default ModalForm;