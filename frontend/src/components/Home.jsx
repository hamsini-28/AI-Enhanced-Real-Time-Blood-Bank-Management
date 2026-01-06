import React from 'react'
import bloodDonationImage from "../assets/blood-donation-image.jpg"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const numbers = [
        {
            mainText:"50,000+",
            secText : "Donors Registered"
        },
        {
            mainText:"150,000+",
            secText : "Lives Saved"
        },
        {
            mainText:"200+",
            secText : "Locations"
        },
    ]
    return (
        <div  id = "home" className='flex flex-col xl:flex-row justify-center items-center gap-10 pb-4 pt-30 sm:pb-12 md:pb-16 lg:pb-20 bg-linear-to-br from-pink-50 to-gray-200 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <div className='flex flex-col gap-8 sm:gap-16'>
                <h3 className='text-4xl sm:text-6xl m-auto font-bold '>Give the Gift of <span className='text-red-600'>Life</span></h3>
                <p className='text-xl sm:text-2xl text-[#696969] font-normal text-center'>Every donation can save up to three lives. Join our community of heroes and make a difference in someone's life today.</p>
                <div className='flex flex-col sm:flex-row gap-8 justify-center items-center '>
                    <a
                    onClick={()=>{if(!token){
                        navigate('signup');
                    }else{
                        navigate("/#events");
                    }
                }}
                     className='text-white text-xl text-center font-semibold hover:cursor-pointer py-1 px-2 w-full max-w-sm bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-full '>
                        {token ? "Register for Event" : "Create a Account"}
                    </a>
                    <button onClick={()=>{navigate('/about')}} className=' hover:cursor-pointer hover:text-white hover:bg-red-600 text-xl font-medium py-1 w-full md:w-fit px-8 max-w-sm border-2 border-red-600 text-red-600 rounded-full '>
                        About Us
                    </button>
                </div>
                <div className='flex gap-5 flex-row justify-around px-2 '>
                        {numbers.map((x,i)=><div key={i}>
                            <h4 className='text-xl sm:text-2xl font-medium text-red-600'>{x.mainText}</h4>
                            <h5>{x.secText}</h5>
                        </div>)}
                    </div>
            </div>
            {/* image */}
                <img src={bloodDonationImage} alt="Blood-Donation-Image" className='w-xl md:w-2xl lg:w-3xl xl:w-xl  rounded-2xl' />
        </div>
    )
}

export default Home