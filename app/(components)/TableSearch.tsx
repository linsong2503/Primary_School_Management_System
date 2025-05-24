import React from 'react'
import Image from 'next/image'
const TableSearch = () => {
  return (
    <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 focus:outline-none focus:border-blue-500'>
        <Image
        src={'/search.png'}
        alt=''
        width={15}
        height={15}
        />
      <input type="search" placeholder='Search....' className='w-[200px] p-2 bg-transparent outline-none'/>
    </div>
  )
}

export default TableSearch
