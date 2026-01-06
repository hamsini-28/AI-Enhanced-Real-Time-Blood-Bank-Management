import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("user"); // user | org

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleSubmit = async () => {
    try {
      const endpoint =
        mode === "user"
          ? "/user/signin"
          : "/org/signin";

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${endpoint}`,
        form,
        { withCredentials: true }
      );

      if (mode === "user") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.fullname);
        navigate("/");
      } else {
        localStorage.setItem("orgToken", res.data.token);
        localStorage.setItem("orgName", res.data.org.orgName);
        navigate("/org/dashboard");
      }
    } catch (error) {
      setErr(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-xl p-8 rounded-xl w-full max-w-md">

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("user")}
            className={`px-4 py-2 rounded-lg ${mode === "user" ? "bg-red-600 text-white" : "bg-gray-200"}`}
          >
            User Login
          </button>

          <button
            onClick={() => setMode("org")}
            className={`px-4 py-2 rounded-lg ${mode === "org" ? "bg-red-600 text-white" : "bg-gray-200"}`}
          >
            Organisation Login
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-3">
          {mode === "user" ? "User Login" : "Organisation Login"}
        </h2>

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
          {mode === "user" ? (
            <>
              Don't have a user account?
              <Link className="text-blue-600" to="/signup"> Sign up</Link>
            </>
          ) : (
            <>
              Don't have an organisation account?
              <Link className="text-blue-600" to="/org/signup"> Register</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Signin;
