import React, { useEffect, useState } from "react";

const Row_supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/suppliers");
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers.");
        }
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-semibold text-violet-700 mb-4" style={{ fontFamily: "Georgia, serif" }}>
        Suppliers List
      </h2>

      {loading && <p className="text-gray-500">Loading suppliers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && suppliers.length === 0 && (
        <p className="text-gray-500">No suppliers found.</p>
      )}

      {!loading && !error && suppliers.length > 0 && (
        <table className="w-full border-collapse rounded-lg shadow-lg">
          <thead className="bg-violet-200 text-gray-800">
            <tr>
              <th className="border p-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>Supplier Name</th>
              <th className="border p-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>Contact Person</th>
              <th className="border p-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>Phone</th>
              <th className="border p-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>Email</th>
              <th className="border p-3 text-lg" style={{ fontFamily: "Georgia, serif" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplier_id} className="hover:bg-pink-100 transition">
                <td className="border p-3" style={{ fontFamily: "Georgia, serif" }}>{supplier.supplier_name}</td>
                <td className="border p-3" style={{ fontFamily: "Georgia, serif" }}>{supplier.contact_person || "N/A"}</td>
                <td className="border p-3" style={{ fontFamily: "Georgia, serif" }}>{supplier.contact_phone || "N/A"}</td>
                <td className="border p-3" style={{ fontFamily: "Georgia, serif" }}>{supplier.company_email || "N/A"}</td>
                <td className="border p-3" style={{ fontFamily: "Georgia, serif" }}>
                  {`${supplier.street}, ${supplier.city}, ${supplier.state}, ${supplier.zipcode}, ${supplier.country}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Row_supplier;
