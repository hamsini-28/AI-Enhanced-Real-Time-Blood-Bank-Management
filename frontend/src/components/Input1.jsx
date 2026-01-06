import React from 'react'

const Input1 = ({placeholderText, type, id , value , onChange}) => {
    return (
        <div className='rounded-lg bg-[#ede9e9] dark:bg-[#1D1D1D] flex flex-col p-1  mx-5 w-full max-w-92 dark:focus-within:outline-[#505050] focus-within:outline-2 focus-within:outline-black '>
            <label htmlFor={id} className=' hover:cursor-pointer text-xs font-normal text-[#808080] dark:text-[#666666] px-2  '>{placeholderText}</label>
            <input id={id} type={type} value={value} onChange={onChange} className='  outline-0 px-2 py-1 dark:text-[#E0E0E0]  ' />
        </div>
    )
}

export default Input1