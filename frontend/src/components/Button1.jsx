import React from 'react'

const Button1 = ({text,onClick}) => {
  return (
    <button onClick={onClick} className='text-white hover:cursor-pointer px-2 w-full max-w-sm h-8 bg-gradient-to-br from-red-500 to-red-700 dark:from-red-700 dark:to-red-900 rounded-lg '>
        {text}
    </button>
  )
}

export default Button1