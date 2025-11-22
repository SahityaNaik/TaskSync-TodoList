import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-around bg-indigo-800 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8 my-2'>TaskSync</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Logout</li>
        </ul>
    </nav>
  )
}

export default navbar
