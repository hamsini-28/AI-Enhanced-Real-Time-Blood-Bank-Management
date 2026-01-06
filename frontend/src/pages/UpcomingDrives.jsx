import { useEffect, useState } from "react";
import axios from "axios";

const UpcomingDrives = () => {
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState({});
  const [filterType, setFilterType] = useState("");
  const token = localStorage.getItem("orgToken");

  const fetchEvents = async (typeFilter = "") => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/org/upcoming-drives${typeFilter ? `?type=${typeFilter}` : ""}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents(res.data.events || []);
      setSummary(res.data.summary || {});
    } catch (err) {
      console.error("Error fetching events:", err.response?.data);
      alert(err.response?.data?.msg || "Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents(filterType);
  }, [filterType]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
        Upcoming Blood Drives
      </h2>

      {/* ✅ Filter checkboxes */}
      <div className="flex justify-center gap-6 mb-6">
        {["School Drives", "Community Drives", "Corporate Events"].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer text-gray-700">
            <input
              type="checkbox"
              checked={filterType === type}
              onChange={() => setFilterType(filterType === type ? "" : type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {/* ✅ Summary Section */}
      {summary && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Summary (within 20 km & next 3 months)</h3>
          <ul className="text-gray-600 space-y-1">
            <li>🩸 Total Upcoming: {summary.totalUpcoming || 0}</li>
            <li>🏫 School Drives: {summary.schoolDrives || 0}</li>
            <li>🏘️ Community Drives: {summary.communityDrives || 0}</li>
            <li>🏢 Corporate Events: {summary.corporateEvents || 0}</li>
          </ul>
        </div>
      )}

      {/* ✅ Event Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {events.length > 0 ? (
          events.map((e, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-800">{e.title}</h3>
              <p className="text-sm text-gray-600">{e.type}</p>
              <p className="text-gray-700 mt-1">
                📅 {new Date(e.date).toLocaleDateString()} • 🕒 {e.time}
              </p>
              <p className="text-gray-600 mt-1">📍 {e.venue}</p>
              <p className="text-gray-500 text-sm mt-2">{e.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">
            No upcoming drives found.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingDrives;
