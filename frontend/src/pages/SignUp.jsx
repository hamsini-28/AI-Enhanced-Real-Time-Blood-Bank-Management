import whitelogo from '../assets/lifeapi_logo_white.png';
import redlogo from '../assets/lifeapi_logo_red.png';
import Input1 from '../components/Input1';
import Button1 from '../components/Button1';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [msg, setMsg] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, {
                email, fullname, password
            });
            if (response.status === 201) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
                setEmail('');
                setFullname('');
                setPassword('');
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg || "Something went wrong")
                return
            } else {
                setMsg("Network error. Please try again.");
                return
            }
        }
    }
    return (
        <div className='flex'>
            <div className='bg-white dark:bg-[#121212] h-screen w-full flex flex-col justify-center items-center gap-4 '>
                <img src={redlogo} alt="Logo" className='w-40 fixed p-3 top-2 left-2 hover:cursor-pointer ' onClick={()=>{navigate("/")}} />
                <h3 className='text-2xl font-semibold dark:text-[#B0B0B0] '>Create a new account</h3>
                <form className='flex flex-col gap-3 w-full justify-center items-center p-5'>
                    <Input1 placeholderText='FULLNAME' type="text" value={fullname} id="fullname" onChange={(e) => { setFullname(e.target.value) }} />
                    <Input1 placeholderText='EMAIL' type="email" value={email} id="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <Input1 placeholderText='PASSWORD' type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <h6 className='text-sm text-red-600'>{msg}</h6>
                    <Button1 text="Sign Up" onClick={onSubmitHandler} />
                    <p className='text-xs font-normal dark:text-[#808080]'>Already have a account? <Link to='/signin' className='text-blue-600'>Sign in</Link></p>
                </form>
            </div>

            <div className='md:flex flex-col gap-5 justify-center items-center bg-linear-to-b dark:from-red-800 dark:to-red-950 from-red-500 to-red-800 h-screen w-full hidden '>
                <img src={whitelogo} alt="Logo" className=' w-70 ' />
                <h1 className=' text-3xl font-serif text-white font-extrabold pb-10 '>Every Drop Counts</h1>
            </div>
        </div>
    )
}

export default SignUp;