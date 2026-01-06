import React from 'react'
import microscopeGirl from '../assets/microscope-girl.avif'

const About = () => {

    const aboutCards = [
        {
            icon: "ri-heart-line",
            color: "text-red-600",
            bg: "bg-pink-50 group-hover:bg-pink-100",
            title: "Save Lives",
            description: "One donation can save up to three lives. Your contribution directly impacts patients in need of blood transfusions."
        },
        {
            icon: "ri-group-line",
            color: "text-blue-600",
            bg: "bg-blue-50 group-hover:bg-blue-100",
            title: "Help Community",
            description: "Join a community of heroes working together to ensure blood is available when and where it's needed most."
        },
        {
            icon: "ri-user-heart-line",
            color: "text-green-600",
            bg: "bg-green-50 group-hover:bg-green-100",
            title: "Free Health Check",
            description: "Receive a mini health screening including blood pressure, temperature, and hemoglobin level checks."
        }
    ];

    const missionPoints = [
        "FDA-approved collection facilities",
        "Rigorous testing and screening",
        "24/7 emergency blood support"
    ];


    return (
        <div  id= "about" className='scroll-mt-20 flex flex-col gap-12 justify-center items-center my-14 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Why Blood Donation Matters</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center '>Blood donation is a simple act that can make a profound difference. Here's what you need to know about the impact of your donation.</h5>
            <div className='flex flex-col lg:flex-row justify-between text-center gap-8'>
                {aboutCards.map((card, i) => <div key={i} className='flex flex-col gap-3 items-center justify-center text-center group '>
                    <i className={` ${card.icon} text-3xl ${card.color} py-2 px-3 rounded-full ${card.bg}` }></i>
                    <h4 className='text-xl sm:text-2xl font-semibold'>{card.title}</h4>
                    <h6 className='text-lg font-normal text-[#696969] '>{card.description}</h6>
                </div>)}
            </div>

            <div className='flex p-4 sm:p-12 flex-col lg:flex-row gap-8 bg-linear-to-br from-pink-50 to-gray-200 rounded-4xl '>
                <div className='flex justify-center flex-col gap-5'>
                    <h3 className='text-2xl sm:text-3xl font-bold'>Our Mission</h3>
                    <h5 className='text-md sm:text-lg text-[#696969] font-normal'>To ensure a safe and adequate blood supply for patients in need through voluntary blood donations from caring individuals in our community. We are committed to providing excellent donor care and maintaining the highest safety standards.</h5>
                    <div className='flex flex-col gap-2'>
                        {missionPoints.map((text,i)=> <div key={i} className='flex gap-2 items-center'>
                            <i className="ri-shield-check-line text-green-500 text-lg sm:text-xl"></i>
                            <h6 className='text-normal sm:text-md text-[#696969] font-normal'>{text}</h6>
                        </div>)}
                    </div>
                </div>
                <img src={microscopeGirl} alt="image" className='rounded-2xl 2xl:w-full lg:w-[350px] xl:w-[500px]  ' />
            </div>
        </div>
    )
}

export default About