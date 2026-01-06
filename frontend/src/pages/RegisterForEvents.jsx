import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const RegisterForEvents = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/bloodServices/events/${eventId}`);
                if (eventRes.status === 200) {
                    setEvent(eventRes.data.event);
                }
            } catch (error) {
                console.log("Error while fetching event: " + error);
            }
        }
        if (eventId) fetchEvent();

    }, [eventId]);

    if (!event) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div className='flex flex-col p-5 items-center w-full max-w-6xl mx-auto'>
            <div className='flex justify-left gap-5 w-full mb-5'>
                <i className="ri-arrow-left-s-line text-3xl font-medium"
                    onClick={() => {
                        navigate("/")
                    }}
                ></i>
                <h3 className='text-3xl font-semibold'>Register Now</h3>
            </div>
            <EventsCard event={event} />
        </div>
    )
}

const EventsCard = ({ event }) => {
    const bloodGroups = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
    const navigate = useNavigate();
    const [openRegisterCard, setOpenRegisterCard] = useState(false);
    const [openDescription, setOpenDescription] = useState(false);
    const [formId, setFormId] = useState('');
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');
    const link = `${window.location.origin}/event/${event.id}`;
    const [registerForm, setRegisterForm] = useState({
        fullname: "",
        bloodType: "",
        lastDonationDate: "",
        phone: "",
        eventModel: "Event"
    })
    const [formSubmitted, setFormSubmitted] = useState(false)
    const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
    const formSubmitHandler = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/donate-blood-form/${event.id}`,
                registerForm,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            if (response.status == 200) {
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
            <h5 className='text-red-600'>
                {message}
            </h5>
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

export default RegisterForEvents