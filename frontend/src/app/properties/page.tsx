"use client";

import {
  useEffect,
  useState,
} from "react";

import PropertiesHeader from "@/components/properties/PropertiesHeader";

import PropertyCard from "@/components/properties/PropertyCard";

import AddPropertyModal from "@/components/properties/AddPropertyModal";

import {
  getProperties,
  deleteProperty,
} from "@/services/property.service";

import toast from "react-hot-toast";

export default function PropertiesPage() {

  const [properties, setProperties] =
    useState<any[]>([]);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    fetchProperties();

  }, []);

  const fetchProperties =
    async () => {

      try {

        const response =
          await getProperties();

        setProperties(
          response.data || []
        );

      } catch (error) {

        console.log(error);
      }
  };

  const handleDelete =
    async (
      id: string
    ) => {

      try {

        const response =
          await deleteProperty(id);

        if (!response.success) {

          toast.error(
            response.message
          );

          return;
        }

        toast.success(
          "Property Deleted"
        );

        fetchProperties();

      } catch (error) {

        toast.error(
          "Delete Failed"
        );
      }
  };

  return (
    <div className="space-y-8">

      <PropertiesHeader
        openModal={() =>
          setShowModal(true)
        }
      />

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {properties.map(
          (property) => (

            <PropertyCard
              key={property.id}
              property={property}
              onDelete={
                handleDelete
              }
            />
          )
        )}

      </div>

      {/* MODAL */}

      {showModal && (

        <AddPropertyModal
          closeModal={() =>
            setShowModal(false)
          }
          refresh={
            fetchProperties
          }
        />
      )}

    </div>
  );
}