import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const OrgLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleSubmit = async () => {
    try {
      // ✅ Remove withCredentials, send plain JSON
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/org/signin`,
        form
      );

      // ✅ Store token and orgName in localStorage
      localStorage.setItem("orgToken", res.data.token);
      localStorage.setItem("orgName", res.data.org.orgName);

      navigate("/org/dashboard");
    } catch (error) {
      setErr(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-xl p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-3">Organization Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full mb-3 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full mb-3 rounded-md"
        />

        {err && <p className="text-red-600">{err}</p>}

        <button
          onClick={handleSubmit}
          className="bg-red-600 w-full text-white py-2 rounded-lg"
        >
          Login
        </button>

        <p className="text-gray-500 mt-2">
          No account?{" "}
          <Link to="/org/signup" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OrgLogin;
