import React, { useEffect, useState } from "react";
import axios from "axios";

const OrgManageStock = () => {
  const [stock, setStock] = useState(null);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const orgId = localStorage.getItem("orgId");

  const fetchStock = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/org/blood-stock`, {
      headers: { Authorization: localStorage.getItem("orgToken") }
    });
    setStock(res.data.stock);
  };

  const updateStock = async (type, action) => {
    await axios.put(`${import.meta.env.VITE_BASE_URL}/org/blood-stock`, {
      bloodType: type,
      action
    }, {
      headers: { Authorization: localStorage.getItem("orgToken") }
    });

    fetchStock();
  };

  useEffect(() => {
    fetchStock();
  }, []);

  if (!stock) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Blood Stock</h2>

      {bloodTypes.map(type => (
        <div key={type} className="flex gap-4 items-center mb-2">
          <p>{type} : {stock[type]}</p>
          <button onClick={() => updateStock(type, "add")}>+</button>
          <button onClick={() => updateStock(type, "remove")}>-</button>
        </div>
      ))}
    </div>
  );
};

export default OrgManageStock;
