import React, { useState, useCallback, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventPage = () => {


    const [filterDetails, setFilterDetails] = useState({
        dateRange: 1000,
        location: 50000,
        eventTypes: ["Community Drives", "Corporate Events", "School Drives"],
    });
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchFilteredEvents = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (pos) => {
                    const { latitude, longitude } = pos.coords;

                    // build payload for backend
                    const payload = {
                        range: {
                            radius: filterDetails.location, // KM
                            coordinates: { lat: latitude, lng: longitude },
                        },
                        daysRange: filterDetails.dateRange,
                        types: filterDetails.eventTypes,
                    };

                    const res = await axios.get(
                        `${import.meta.env.VITE_BASE_URL}/bloodServices/events`,
                        {
                            params: payload
                        }
                    );

                    setEvents(res.data.events);
                });
            } catch (error) {
                console.error("Error fetching filtered events:", error);
            }
        };

        fetchFilteredEvents();
    }, [filterDetails]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const payload = {
                    daysRange: filterDetails.dateRange,
                    types: filterDetails.eventTypes,
                };

                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/bloodServices/events`,
                    {
                        params: payload
                    }
                );

                setEvents(res.data.events.slice(0, 3));
            } catch (error) {
                console.error("Error fetching filtered events:", error);
            }
        };

        getEvents();

    }, [])


    const handleDateChange = useCallback((val) => {
        setFilterDetails((prev) => ({ ...prev, dateRange: Number(val) }));
    }, []); // Empty dependency array means this function is created only once

    const handleLocationChange = useCallback((val) => {
        setFilterDetails((prev) => ({ ...prev, location: Number(val) }));
    }, []); // Empty dependency array means this function is created only once

    const handleCheckboxChange = (label) => {
        setFilterDetails((prev) => {
            const isSelected = prev.eventTypes.includes(label);
            return {
                ...prev,
                eventTypes: isSelected
                    ? prev.eventTypes.filter((t) => t !== label)
                    : [...prev.eventTypes, label],
            };
        });
    };
    return (
        <section id="events" className='flex flex-col gap-12 justify-center items-center scroll-mt-20 my-14 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Upcoming Blood Drives</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal max-w-5xl text-center '>Join us at community blood drive events happening near you. These special events bring donation opportunities directly to your neighborhood.</h5>
            {/* parent div for filter events and events cards */}
            <div className='w-full flex flex-col lg:flex-row gap-8'>
                {/* Filter enents */}
                <div className=' w-full lg:w-lg bg-gray-50 p-6 rounded-3xl h-fit lg:sticky lg:top-24 self-start '>
                    <h4 className='text-xl font-semibold'>Filter Events</h4>
                    {/* Date Range */}
                    <DropdownFunction
                        mainType="Date Range"
                        selected={filterDetails.dateRange}
                        setSelected={handleDateChange}
                        options={[
                            { text: "All upcoming", value: 1000 },
                            { text: "Next 7 days", value: 7 },
                            { text: "Next 30 days", value: 30 },
                            { text: "Next 3 months", value: 90 },
                        ]}
                    />

                    {/* Location */}
                    <DropdownFunction
                        mainType="Locations"
                        selected={filterDetails.location}
                        setSelected={handleLocationChange}
                        options={[
                            { text: "All locations", value: 50000 },
                            { text: "Within 20 kms", value: 20 },
                            { text: "Within 30 kms", value: 30 },
                            { text: "Within 50 kms", value: 50 },
                        ]}
                    />


                    {/* Event Types */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                        <div className="space-y-2">
                            {["Community Drives", "Corporate Events", "School Drives"].map((label) => (
                                <div key={label} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={label}
                                        checked={filterDetails.eventTypes.includes(label)}
                                        onCheckedChange={() => handleCheckboxChange(label)}
                                        className="border-2 border-blue-500 rounded data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    />
                                    <label htmlFor={label} className="text-sm text-gray-700 cursor-pointer">
                                        {label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Events detail */}
                <div className='w-full  '>
                    {events.map((event, i) => <EventsCard key={i} event={event} />)}
                    {events.length === 0 ? <h5 className='text-xl ml-10 text-red-600  font-medium'>No Events Found</h5> : null}
                </div>
            </div>
        </section>
    )
}


const EventsCard = ({ event }) => {
    const bloodGroups = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
    const navigate = useNavigate();
    const [openRegisterCard, setOpenRegisterCard] = useState(false);
    const [openDescription, setOpenDescription] = useState(false);
    const [formId, setFormId] = useState('')
    const [registerForm, setRegisterForm] = useState({
        fullname: "",
        bloodType: "",
        lastDonationDate: "",
        phone: "",
        eventModel: "Event"
    })
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');
    const link = `${window.location.origin}/event/${event._id}`;
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2s
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/donate-blood-form/${event.id}`,
                registerForm,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (response.status == 200) {
                setRegisterForm({
                    fullname: response.data.fullname,
                    bloodType: response.data.bloodType,
                    lastDonationDate: response.data.lastDonationDate,
                    phone: response.data.phone,
                    eventModel: "Event"
                })
                setFormId(response.data?.donateForm._id);
                setFormSubmitted(true);
                setOpenRegisterCard(false);
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || "Something went wrong")
                return
            } else {
                setMessage("Network error. Please try again.");
                return
            }
        }
    }
    const formDeleteHandler = async () => {
        try {
            console.log(localStorage.getItem('token'));
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/donate-blood-form`,
                {
                    data: { formId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (response.status == 200) {
                setFormSubmitted(false);
                setOpenRegisterCard(false);
                setRegisterForm({
                    fullname: "",
                    bloodType: "",
                    lastDonationDate: "",
                    phone: "",
                    eventModel: "Event"
                })
            }
        } catch (error) {
            console.log("Error submitting donate blood form " + error);
        }
    }
    return <div className='mb-10 p-6 rounded-3xl w-full shadow-xl border border-gray-200'>
        <h4 className='text-xl font-semibold '>{event.title}</h4>
        <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex items-center gap-2 text-sm text-[#696969]'>
                <i className="ri-calendar-line"></i>
                <h6>{event.date}</h6>
                <h6>• {event.time}</h6>
            </div>
            <div className={`py-1 px-2 rounded-2xl flex gap-1 items-center w-fit ${event.status === "upcoming" || "ongoing" ? "bg-green-100 " : "bg-red-100"}`}>
                <div className={`h-3 w-3 rounded-full ${event.status === "upcoming" || "ongoing" ? "bg-green-500 text-green-500 " : "bg-red-500 text-red-500"}`} ></div>
                <h6 className={`${event.status === "upcoming" || "ongoing" ? "text-green-700 " : "text-red-700"}`}>{event.status}</h6>
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
                {/* line  */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-red-600 transition-all duration-300 ease-out"
                        style={{ width: `${event.progress}%` }}
                    />
                </div>
                <h6 className='text-[#696969]'>{event.registered} / {event.goal}</h6>
            </div>
        </div>
        {/* buttons */}
        <div className='flex justify-start flex-col sm:flex-row gap-3'>
            <button className='text-white hover:cursor-pointer flex gap-2 items-center justify-center px-2 w-full sm:w-fit h-8 bg-red-600 hover:bg-red-700 rounded-lg '
                onClick={() => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        navigate('/signin');
                    }
                    setOpenRegisterCard(!openRegisterCard);
                    setRegisterForm({
                        fullname: "",
                        bloodType: "",
                        lastDonationDate: "",
                        phone: "",
                        eventModel: "Event"
                    });
                    setOpenDescription(false);
                }}>
                <i className="ri-add-line"></i>
                {!formSubmitted && <h5>Register for event</h5>}
                {formSubmitted && <h5>Registered Successfully</h5>}
            </button>
            <button className='flex items-center justify-center hover:cursor-pointer gap-2 hover:text-blue-500 hover:bg-blue-50 text-base font-normal py-1 w-full px-8 sm:w-fit border border-gray-200 text-black rounded-full '
                onClick={() => {
                    setOpenDescription(!openDescription);
                    setOpenRegisterCard(false);
                    setRegisterForm({
                        fullname: "",
                        bloodType: "",
                        lastDonationDate: "",
                        phone: "",
                        eventModel: "Event"
                    })
                }}>
                <i className="ri-information-line"></i>   <h5>Description</h5>
            </button>
            <button className='flex items-center justify-center hover:cursor-pointer gap-2 hover:text-blue-500 hover:bg-blue-50 text-base font-normal py-1 w-full px-8 sm:w-fit border border-gray-200 text-black rounded-full '
                onClick={handleCopy}>
                <i className="ri-share-2-line"></i>   <h5>Share</h5>
            </button>
            {copied && <p className="text-green-600">✅ Link copied!</p>}
        </div>
        {/* RegisterForm */}
        {openRegisterCard && <div className='flex flex-col gap-4 w-full p-6 bg-gray-100  rounded-4xl mt-6'>
            <div className='flex flex-col md:flex-row gap-6 w-full'>
                <div className='flex flex-col w-full  gap-3 '>
                    <label htmlFor="fullname" className='font-medium text-[#696969]'>ENTER FULLNAME :</label>
                    <input className='max-w-lg w-full p-1 rounded-lg bg-white border border-gray-400' id='fullname' type="text"
                        onChange={(e) => { setRegisterForm((prev) => ({ ...prev, fullname: e.target.value })) }}
                        value={registerForm.fullname} />
                </div>
                <div className='flex flex-col w-full  gap-3'>
                    <label htmlFor="number" className='font-medium text-[#696969] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'>PHONE NUMBER : </label>
                    <input className='max-w-lg w-full p-1 rounded-lg bg-white border border-gray-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' id='number' type="number"
                        onChange={(e) => { setRegisterForm((prev) => ({ ...prev, phone: e.target.value })) }} value={registerForm.phone} />
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <label htmlFor="date" className='font-medium text-[#696969]'>LAST DONATION DATE</label>
                <input className='bg-white border border-gray-400 w-fit p-1 rounded-lg' id='date' type="date"
                    onChange={(e) => { setRegisterForm((prev) => ({ ...prev, lastDonationDate: e.target.value })) }} value={registerForm.lastDonationDate} />
            </div>
            <h4 className='font-medium text-[#696969]'>Select BloodGroup</h4>
            <div className='grid grid-cols-4 sm:grid-cols-8 gap-3'>
                {bloodGroups.map((type, i) => (
                    <div
                        key={i}
                        onClick={() =>
                            setRegisterForm((prev) => ({ ...prev, bloodType: type }))
                        }
                        className={`h-8 w-12 text-lg text-[#696969] border-2 border-gray-300 rounded-lg text-center ${registerForm.bloodType === type
                            ? "bg-red-100 border-red-600"
                            : "bg-white"
                            }`}
                    >
                        {type}
                    </div>
                ))}

            </div>
            <h5 className='text-red-600'>{message}</h5>
            <button
                disabled={formSubmitted}
                className={`text-white hover:cursor-pointer flex gap-2 items-center justify-center px-2 w-full sm:w-fit h-8 
              ${formSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} rounded-lg`}
                onClick={formSubmitHandler}
            >
                <i className="ri-add-line"></i>
                {!formSubmitted && <h5>Submit Form</h5>}
                {formSubmitted && <h5>Submitted</h5>}
            </button>
            {formSubmitted && <button
                className={`text-white hover:cursor-pointer flex gap-2 items-center justify-center px-2 w-full sm:w-fit h-8 
              ${formSubmitted ? "bg-red-600 hover:bg-red-700" : " bg-gray-400 cursor-not-allowed"} rounded-lg`}
                onClick={formDeleteHandler}
            >
                <i className="ri-add-line"></i>
                <h5>Delete Form</h5>
            </button>}

        </div>}
        {
            openDescription && <div className='w-full p-6 border border-gray-300 bg-gray-100 rounded-4xl mt-6'>
                {event.description}
            </div>
        }
    </div>
}

const DropdownFunction = ({ mainType, options, selected, setSelected }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{mainType}</label>
            <Select
                value={String(selected)}
                onValueChange={(val) => setSelected(val)}
            >
                <SelectTrigger className="w-full rounded-2xl focus-visible:ring-1 focus-visible:ring-blue-500">
                    <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-white border-0 w-full rounded-2xl">
                    {options.map((x, i) => (
                        <SelectItem
                            key={i}
                            value={String(x.value)}   // ✅ ensure string
                            className="w-full font-normal hover:bg-blue-50 hover:text-blue-600"
                        >
                            {x.text}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};


export default EventPage
