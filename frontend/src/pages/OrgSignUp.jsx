import { useState } from "react";
import axios from "axios";
import whitelogo from '../assets/lifeapi_logo_white.png';
import redlogo from '../assets/lifeapi_logo_red.png';
import Input1 from '../components/Input1';
import Button1 from '../components/Button1';
import { useNavigate } from "react-router-dom";

const OrgSignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        const orgName = document.getElementById("orgname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const registrationNumber = document.getElementById("regno").value;
        const orgType = document.querySelector("input[name='facility']:checked")?.value;

        if (!orgName || !email || !password || !orgType) {
            setError("All required fields must be filled!");
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/org/register`, {
                orgName,
                email,
                password,
                registrationNumber,
                orgType
            });

            if (res.status === 200 || res.status === 201) {
                alert("Organisation Registered Successfully ✅");
                navigate("/org/login");
            }
        } catch (err) {
            setError(err.response?.data?.msg || "Registration failed");
        }
    };

    return (
        <div className='flex'>
            <div className='bg-white dark:bg-[#121212] h-screen w-full flex flex-col justify-center items-center gap-4 '>
                <img src={redlogo} alt="Logo" className='w-40 fixed p-3 top-2 left-2' />
                <h3 className='text-2xl font-semibold dark:text-[#B0B0B0] '>Register Organization</h3>

                <div className='flex flex-col gap-3 w-full justify-center items-center p-5'>
                    <Input1 placeholderText='Organization NAME' type="text" id="orgname" />
                    <Input1 placeholderText='EMAIL OR USERNAME' type="text" id="email" />
                    <Input1 placeholderText='PASSWORD' type="password" id="password" />
                    <Input1 placeholderText='REGISTRATION NUMBER(optional)' type="number" id="regno" />

                    <h4 className='text-lg font-medium dark:text-[#B0B0B0]' >ORGANIZATION TYPE</h4>

                    <div className='flex flex-col sm:flex-row justify-center items-center gap-3'>
                        <label htmlFor="hospital" className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" id="hospital" value="Hospital" name="facility" className="hidden peer" />
                            <span className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-red-600 peer-checked:bg-red-600 flex items-center justify-center">
                                <span className="w-2 h-2 bg-white rounded-full"></span>
                            </span>
                            <span className="text-lg dark:text-[#B0B0B0]">HOSPITAL</span>
                        </label>

                        <label htmlFor="ngo" className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" id="ngo" value="Ngo" name="facility" className="hidden peer" />
                            <span className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-red-600 peer-checked:bg-red-600 flex items-center justify-center">
                                <span className="w-2 h-2 bg-white rounded-full"></span>
                            </span>
                            <span className="text-lg dark:text-[#B0B0B0]">NGO</span>
                        </label>

                        <label htmlFor="bloodbank" className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" id="bloodbank" value="Bloodbank" name="facility" className="hidden peer" />
                            <span className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-red-600 peer-checked:bg-red-600 flex items-center justify-center">
                                <span className="w-2 h-2 bg-white rounded-full"></span>
                            </span>
                            <span className="text-lg dark:text-[#B0B0B0]">BLOODBANK</span>
                        </label>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <Button1 text="Sign Up" onClick={handleSubmit} />

                    <p className='text-xs font-normal dark:text-[#808080]'>
                        Already have an account? <span onClick={() => navigate("/org/login")} className="text-red-500 cursor-pointer">Sign in</span>
                    </p>
                </div>
            </div>

            <div className='md:flex flex-col gap-5 justify-center items-center bg-linear-to-b dark:from-red-800 dark:to-red-950 from-red-500 to-red-800 h-screen w-full hidden '>
                <img src={whitelogo} alt="Logo" className=' w-70 ' />
                <h1 className=' text-3xl font-serif text-white font-extrabold pb-10 '>Every Drop Counts</h1>
            </div>
        </div>
    );
};

export default OrgSignUp;
