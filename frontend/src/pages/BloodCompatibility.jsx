import React from 'react'

const BloodCompatibility = () => {

    const bloodTypes = [
        {
            type: "O+",
            peoplePercentage: 38,
            donateTo: ["O+", "A+", "B+", "AB+"],
            receiveFrom: ["O+", "O-"]
        },
        {
            type: "A+",
            peoplePercentage: 34,
            donateTo: ["A+", "AB+"],
            receiveFrom: ["A+", "A-", "O+", "O-"]
        },
        {
            type: "B+",
            peoplePercentage: 9,
            donateTo: ["B+", "AB+"],
            receiveFrom: ["B+", "B-", "O+", "O-"]
        },
        {
            type: "AB+",
            peoplePercentage: 3,
            donateTo: ["AB+ only"],
            receiveFrom: ["All types"]
        }
    ];

    const universalBloodTypes = [
        {
            icon : "ri-gift-line",
            iconColor : "text-red-600",
            textBgColor : "bg-red-600",
            bgColor : "bg-red-100",
            bloodType : "O-",
            type : "Universal Donor",
            description : "Type O- blood can be given to patients of any blood type, making it incredibly valuable in emergency situations."
        },
        {
            icon : "ri-heart-add-line",
            iconColor : "text-blue-500",
            textBgColor : "bg-blue-500",
            bgColor : "bg-blue-100",
            bloodType : "AB+",
            type : "Universal Recipient",
            description : "Type AB+ patients can receive blood from any donor type, but their blood can only help other AB+ patients."
        }
    ]

    return (
        <div id='blood-types' className='flex flex-col gap-12 justify-center items-center bg-gray-50 my-14 lg:py-16 md:py-12 py-10 sm:px-16 lg:px-20 xl:px-36 px-4'>
            <h2 className='text-3xl sm:text-4xl font-bold'>Blood Type Compatibility</h2>
            <h5 className='text-xl sm:text-2xl text-[#696969] font-normal md:w-[768px] text-center px-1'>Understanding blood type compatibility helps ensure safe transfusions and shows how your donation can help specific patients.</h5>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-between text-center mt-6 w-full'>
                {bloodTypes.map((blood, i) => <BloodTypeCard key={i} blood={blood} />)}
            </div>

            <div className='flex flex-col items-center w-full py-8 px-5 bg-white rounded-3xl shadow-xl '>
                <h3 className='text-2xl text-black font-bold'>Universal Donor & Recipient</h3>
                <div className='flex flex-col md:flex-row gap-8 p-4'>
                    {universalBloodTypes.map((type,i)=> <UniversalBloodCard
                    key={i}
                    type={type}
                    />)}
                </div>
            </div>
        </div>
    )
}

const BloodTypeCard = ({ blood }) => {

    return (
        <div className='flex flex-col gap-3 items-center bg-white py-3 px-2 shadow-lg hover:shadow-xl transition-shadow duration-200 w-full rounded-xl '>
            <h2 className='w-16 h-16 flex items-center justify-center text-xl  rounded-full bg-red-600 '>{blood.type}</h2>
            <h3 className='font-semibold text-xl '>Type {blood.type}</h3>
            <h4 className='text-[#696969]'>{blood.peoplePercentage}% of population</h4>
            <div className='flex flex-col items-center'>
                <div className='flex gap-1 items-center text-[#696969]'>
                    <h5 className='text-sm font-medium'>Donate to:</h5>
                    {blood.donateTo.map((type, i) => <span key={i} className='text-sm font-normal '>{type}{i != blood.donateTo.length - 1 ? ", " : null}</span>)}
                </div>
                <div className='flex gap-1 items-center text-[#696969]'>
                    <h5 className='text-sm font-medium'>Receive from:</h5>
                    {blood.receiveFrom.map((type, i) => <span className='text-sm font-normal ' key={i}>{type}{i != blood.receiveFrom.length - 1 ? ", " : null}</span>)}
                </div>
            </div>
        </div>
    )
}

const UniversalBloodCard = ({type})=>{

    return (
        <div className={`flex flex-col items-center p-8 w-full gap-4 ${type.bgColor} rounded-2xl`}>
            <i className={`${type.icon} ${type.iconColor} text-3xl font-semibold`}></i>
            <h4 className='text-xl font-semibold text-black'>{type.type}</h4>
            <h4 className={`h-16 w-16 flex justify-center items-center rounded-full text-white ${type.textBgColor} text-xl font-semibold`}>{type.bloodType}</h4>
            <p className='text-lg text-[#696969] text-center '>{type.description}</p>
        </div>
    )
}

export default BloodCompatibility