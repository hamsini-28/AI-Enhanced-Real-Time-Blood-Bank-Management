import { useEffect, useState } from "react";
import axios from "axios";

const OrgManageStock = () => {
  const [stock, setStock] = useState(null);
  const token = localStorage.getItem("orgToken");

  const fetchStock = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/org/blood-stock`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStock(res.data.stock);
    } catch (err) {
      alert("Failed to load stock");
    }
  };

  const updateStock = async (type, value) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/org/blood-stock`, {
        type,
        count: value
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStock();
    } catch (err) {
      alert("Failed to update");
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  if (!stock) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-xl font-bold text-red-600 mb-4">Manage Blood Stock</h2>

      {Object.entries(stock).map(([type, qty], i) => (
        <div key={i} className="flex justify-between border p-2 mb-2">
          <span>{type}</span>
          <input
            type="number"
            defaultValue={qty}
            className="border p-1 w-20"
            onBlur={(e) => updateStock(type, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

export default OrgManageStock;
