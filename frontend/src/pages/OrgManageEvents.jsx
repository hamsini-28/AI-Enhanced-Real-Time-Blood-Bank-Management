import { useState, useEffect } from "react";
import axios from "axios";

const OrgManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    venue: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    address: "",
    description: "",
    goal: "",
    type: ""
  });

  const token = localStorage.getItem("orgToken");

  // ✅ Fetch events for logged-in organization
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/org/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.events || []);
    } catch (err) {
      console.log("❌ Error fetching events:", err.response?.data);
    }
  };

  // ✅ Create new event
  const createEvent = async () => {
    try {
      // Combine "from" and "to" times into a single string
      const payload = {
        title: form.title.trim(),
        venue: form.venue.trim(),
        date: form.date,
        time:
          form.timeFrom && form.timeTo
            ? `${form.timeFrom} - ${form.timeTo}`
            : form.timeFrom || form.timeTo || "",
        address: form.address.trim(),
        description: form.description.trim(),
        goal: Number(form.goal),
        type: form.type, // must match backend enum exactly
      };

      // Validate before sending
      if (
        !payload.title ||
        !payload.venue ||
        !payload.date ||
        !payload.time ||
        !payload.address ||
        !payload.description ||
        !payload.goal ||
        !payload.type
      ) {
        alert("⚠️ Please fill in all fields before creating an event.");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/org/event`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.msg || "✅ Event created successfully!");
      setForm({
        title: "",
        venue: "",
        date: "",
        timeFrom: "",
        timeTo: "",
        address: "",
        description: "",
        goal: "",
        type: "",
      });
      fetchEvents();
    } catch (err) {
      console.error("❌ Error creating event:", err.response?.data);
      alert(err.response?.data?.msg || "❌ Failed to create event. Please check backend logs.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-red-600 mb-4">Manage Events</h2>

      <div className="flex flex-col gap-2 mb-6">
        <input
          placeholder="Title"
          value={form.title}
          className="border p-2"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Venue"
          value={form.venue}
          className="border p-2"
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          className="border p-2"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <div className="flex gap-2">
          <input
            type="time"
            value={form.timeFrom}
            className="border p-2 flex-1"
            onChange={(e) => setForm({ ...form, timeFrom: e.target.value })}
          />
          <input
            type="time"
            value={form.timeTo}
            className="border p-2 flex-1"
            onChange={(e) => setForm({ ...form, timeTo: e.target.value })}
          />
        </div>

        <input
          placeholder="Address"
          value={form.address}
          className="border p-2"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          className="border p-2"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Goal (No. of donors)"
          value={form.goal}
          className="border p-2"
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
        />

        {/* ✅ Fixed: Match backend enums exactly */}
        <select
          value={form.type}
          className="border p-2"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">Select Event Type</option>
          <option value="Community Drives">Community Drives</option>
          <option value="Corporate Events">Corporate Events</option>
          <option value="School Drives">School Drives</option>
        </select>

        <button
          onClick={createEvent}
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
        >
          Create Event
        </button>
      </div>

      {/* ✅ Show Events */}
      {events.length > 0 ? (
        events.map((e, i) => (
          <div key={i} className="p-3 border rounded mb-2 shadow-sm">
            <h3 className="font-semibold text-lg">{e.title}</h3>
            <p className="text-gray-600">{e.date?.slice(0, 10)} • {e.time}</p>
            <p className="text-gray-800">{e.venue}</p>
            <p className="text-sm text-gray-500">{e.type}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No Events Found</p>
      )}
    </div>
  );
};

export default OrgManageEvents;
