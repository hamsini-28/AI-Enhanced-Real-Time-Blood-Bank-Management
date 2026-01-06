import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const RegisterForCenter = () => {
    const bloodGroups = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]
    const navigate = useNavigate();
    const [org, setOrg] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formId, setFormId] = useState(null);
    const [message, setMessage] = useState('');
    const [registerForm, setRegisterForm] = useState({
        fullname: "",
        bloodType: "",
        lastDonationDate: "",
        phone: "",
        eventModel: "Organization"
    });
    const { orgId } = useParams();

    useEffect(() => {
        const fetchOrg = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/bloodServices/org/${orgId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                setOrg(response.data.org);
            } catch (err) {
                console.error("Error fetching org", err);
            }
        };
        fetchOrg();
    }, []);

    const handleChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/user/donate-blood-form/${org.OrgId}`,
                registerForm,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.status === 200) {
                setFormId(response.data?.donateForm?._id);
                setShowForm(false);
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
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/user/donate-blood-form`,
                {
                    data: { formId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setFormId(null);
        } catch (err) {
            console.error("Error deleting form", err);
        }
    };

    if (!org) return <p className="text-center mt-10">Loading organization...</p>;

    return (
        <div className="flex justify-center mt-15">
            <div className=" shadow-xl rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-red-600 mb-2">{org.orgName.toUpperCase()}</h2>
                <p className="text-gray-600">
                    <strong>Type:</strong> {org.orgType}
                </p>
                <p className="text-gray-600">
                    <strong>Contact:</strong> {org.contactNumber}
                </p>
                <p className="text-gray-600">
                    <strong>Email:</strong> {org.email}
                </p>
                <p className="text-gray-600">
                    <strong>Address:</strong> {org.address}
                </p>
                <p className="text-gray-600">
                    <strong>Timings:</strong> {org.timings}
                </p>

                <div className="mt-6">
                    {!formId ? (
                        <button
                            onClick={() => {
                                const token = localStorage.getItem('token');
                                if(!token){
                                    navigate('/signin');
                                }
                                setShowForm(true)
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full"
                        >
                            Register
                        </button>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                                ✅ Registered Successfully
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                            >
                                Delete Registration
                            </button>
                        </div>
                    )}
                </div>

                {/* Registration Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-linear-to-br from-red-50 to-gray-200  flex justify-center items-center">
                        <div className="bg-white p-6 rounded-2xl w-full max-w-md  border border-gray-300">
                            <h3 className="text-xl font-bold mb-4">Register for Donation</h3>
                            <input
                                type="text"
                                name="fullname"
                                value={registerForm.fullname}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="border p-2 w-full mb-3 rounded-lg"
                            />
                            <h4 className='my-3'>Select BloodGroup</h4>
                            <div className='grid grid-cols-4 gap-4 p-4'>
                                {bloodGroups.map((type, i) => (
                                    <div
                                        key={i}
                                        onClick={() =>
                                            setRegisterForm((prev) => ({ ...prev, bloodType: type }))
                                        }
                                        className={`h-8 w-12 text-lg text-[#696969] border-2 border-red-700 rounded-lg text-center ${registerForm.bloodType === type
                                            ? "bg-red-100 border-red-600"
                                            : "bg-white"
                                            }`}
                                    >
                                        {type}
                                    </div>
                                ))}

                            </div>
                            <input
                                type="date"
                                name="lastDonationDate"
                                value={registerForm.lastDonationDate}
                                onChange={handleChange}
                                className="border p-2 w-full mb-3 rounded-lg"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={registerForm.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="border p-2 w-full mb-3 rounded-lg"
                            />
                            <h5 className="text-red-600">{message}</h5>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterForCenter;
