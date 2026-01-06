import React, { useState, useEffect } from "react";

const eventTypes = [
    "Community Drives",
    "Corporate Events",
    "School Drives",
];

function CreateEvent() {
    const [form, setForm] = useState({
        title: "",
        type: eventTypes[0],
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        time: "",
        venue: "",
        location: "",
        goal: "",
    });

    const [view, setView] = useState("create"); // "create" or "list"
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const updated = { ...prev, [name]: value };
            if (updated.startTime && updated.endTime) {
                updated.time = `from ${updated.startTime} to ${updated.endTime}`;
            } else {
                updated.time = "";
            }
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here
        alert("Event Created!\nTime: " + form.time);
    };

    useEffect(() => {
        if (view === "list") {
            setLoading(true);
            // Replace with your backend API call
            fetch("/api/events")
                .then((res) => res.json())
                .then((data) => {
                    setEvents(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
            // For demo, you can use static data:
            // setEvents([ { ... } ]);
            setEvents([{
            title: "Community Center Blood Drive",
            date: "Saturday, December 16, 2023",
            time: "9:00 AM - 4:00 PM",
            venue: "Riverside Community Center",
            address: "123 Community Ave, Riverside, ST 12345",
            organizer: "Riverside Rotary Club",
            goal: "50 donations",
            registered: "32 registered",
            progress: 65,
            status: "Appointments Available"
        },
        {
            title: "Corporate Blood Drive - TechCorp",
            date: "Tuesday, December 19, 2023",
            time: "10:00 AM - 6:00 PM",
            venue: "TechCorp Headquarters",
            address: "456 Innovation Drive, Tech Park, ST 12348",
            organizer: "TechCorp Employee Council",
            goal: "75 donations",
            registered: "34 registered",
            progress: 45,
            status: "Open to Public"
        },])
        }
    }, [view]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-10">
            <div className="flex gap-4 mb-8">
                <button
                    className={`px-6 py-2 rounded font-semibold transition ${
                        view === "create"
                            ? "bg-red-600 text-white"
                            : "bg-white text-red-600 border border-red-600"
                    }`}
                    onClick={() => setView("create")}
                >
                    Create an Event
                </button>
                <button
                    className={`px-6 py-2 rounded font-semibold transition ${
                        view === "list"
                            ? "bg-red-600 text-white"
                            : "bg-white text-red-600 border border-red-600"
                    }`}
                    onClick={() => setView("list")}
                >
                    See Your All Events
                </button>
            </div>
            {view === "create" ? (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
                        Create Blood Donation Event
                    </h2>
                    {/* ...form fields as before... */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            minLength={3}
                            required
                            placeholder="Event Title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Type of Event</label>
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            required
                        >
                            {eventTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            minLength={10}
                            required
                            placeholder="Describe your event"
                        />
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                required
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Start Time</label>
                            <input
                                type="time"
                                name="startTime"
                                value={form.startTime}
                                onChange={handleTimeChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">End Time</label>
                            <input
                                type="time"
                                name="endTime"
                                value={form.endTime}
                                onChange={handleTimeChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            value={form.venue}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            minLength={5}
                            required
                            placeholder="Venue Address"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            required
                            placeholder="Location (e.g. City, State)"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 font-medium">Goal (Number of Donations)</label>
                        <input
                            type="number"
                            name="goal"
                            value={form.goal}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                            min={0}
                            required
                            placeholder="Goal"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
                    >
                        Create Event
                    </button>
                </form>
            ) : (
                <div className="w-full max-w-3xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
                        Your Events
                    </h2>
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading events...</div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No events found.</div>
                    ) : (
                        events.map((event, idx) => (
                            <EventsCard key={idx} event={event} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

const EventsCard = ({ event }) => {
    return (
        <div className='mb-10 p-6 rounded-3xl w-full shadow-xl border border-gray-200'>
            <h4 className='text-xl font-semibold '>{event.title}</h4>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex items-center gap-2 text-sm text-[#696969]'>
                    <i className="ri-calendar-line"></i>
                    <h6>{event.date}</h6>
                    <h6>• {event.time}</h6>
                </div>
                <div className={`py-1 px-2 rounded-2xl flex gap-1 items-center w-fit ${event.status === "Appointments Available" ? "bg-green-100 " : "bg-red-100"}`}>
                    <div className={`h-3 w-3 rounded-full ${event.status === "Appointments Available" ? "bg-green-500 text-green-500 " : "bg-red-500 text-red-500"}`} ></div>
                    <h6 className={`${event.status === "Appointments Available" ? "text-green-700 " : "text-red-700"}`}>{event.status}</h6>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between w-full my-5'>
                <div>
                    <div className='flex items-center gap-2 '>
                        <i className="ri-map-pin-line text-[#696969] text-lg"></i>
                        <h5 className='text-lg font-medium'>{event.venue}</h5>
                    </div>
                    <h6 className='mb-2'>{event.address}</h6>
                    <div className='flex items-center gap-2 text-[#696969]'>
                        <i className="ri-group-line"></i>
                        <h6>Hosted by</h6>
                        <h5 className='font-medium'>{event.organizer}</h5>
                    </div>
                </div>
                <div className='w-full md:max-w-sm'>
                    <div className='flex gap-2'>
                        <h5 className='font-medium'>Goal:</h5>
                        <h6 className='text-[#696969]'>{event.goal}</h6>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-600 transition-all duration-300 ease-out"
                            style={{ width: `${event.progress}%` }}
                        />
                    </div>
                    <h6 className='text-[#696969]'>{event.registered} / {event.goal}</h6>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
