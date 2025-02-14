
import React from 'react'
import BasicSelect from '../custom/Select'

const NavBar = () => {
  return (
    <section >
        <div className='flex justify-between items-center text-white px-4 py-4 '>
            <div className='transform  text-black font-extrabold text-[24px]'>
                {/* <img src="/logo.jpg" alt="google_drive" className='w-[7%] rounded-full'/> */}
                RIPO CYBER
            </div>
            <div className='transform '>
                <BasicSelect/>
            </div>
        </div>
    </section>
  )
}

export default NavBar