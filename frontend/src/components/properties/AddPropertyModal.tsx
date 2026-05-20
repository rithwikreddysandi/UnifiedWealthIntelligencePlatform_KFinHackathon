"use client";

import {
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  createProperty,
} from "@/services/property.service";

interface Props {
  closeModal: () => void;

  refresh: () => void;
}

export default function AddPropertyModal({
  closeModal,
  refresh,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      property_name: "",
      property_type: "",
      location: "",
      current_valuation: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const investorId =
          localStorage.getItem(
            "investorId"
          );

        const response =
          await createProperty({
            ...formData,

            investor_id:
              investorId,
          });

        if (!response.success) {

          toast.error(
            response.message
          );

          return;
        }

        toast.success(
          "Property Added"
        );

        refresh();

        closeModal();

      } catch (error) {

        toast.error(
          "Failed to add property"
        );

      } finally {

        setLoading(false);
      }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          glass-card
          rounded-3xl
          p-8
          w-full
          max-w-2xl
        "
      >

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-black">

            Add Property

          </h2>

          <button
            onClick={closeModal}
            className="
              w-10
              h-10
              rounded-xl
              bg-red-500/20
              text-red-400
            "
          >

            ✕

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="property_name"
            placeholder="Property Name"
            value={
              formData.property_name
            }
            onChange={
              handleChange
            }
            className="px-4 py-4 rounded-2xl bg-transparent border border-[var(--card-border)] outline-none"
          />

          <input
            type="text"
            name="property_type"
            placeholder="Property Type"
            value={
              formData.property_type
            }
            onChange={
              handleChange
            }
            className="px-4 py-4 rounded-2xl bg-transparent border border-[var(--card-border)] outline-none"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            className="md:col-span-2 px-4 py-4 rounded-2xl bg-transparent border border-[var(--card-border)] outline-none"
          />

          <input
            type="number"
            name="current_valuation"
            placeholder="Current Valuation"
            value={
              formData.current_valuation
            }
            onChange={
              handleChange
            }
            className="md:col-span-2 px-4 py-4 rounded-2xl bg-transparent border border-[var(--card-border)] outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              md:col-span-2
              py-4
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              transition-all
              font-semibold
            "
          >

            {loading
              ? "Please wait..."
              : "Add Property"}

          </button>

        </form>

      </div>

    </div>
  );
}