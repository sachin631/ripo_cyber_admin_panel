
import React from 'react'
import BasicSelect from '../custom/Select'

const NavBar = () => {
  return (
    <section >
        <div className='flex justify-between items-center  '>
            <div className='transform  '>
                <img src="https://d110yui55r0n46.cloudfront.net/logo2.png" alt="google_drive" className='w-[30%]'/>
            </div>
            <div className='transform '>
                <BasicSelect/>
            </div>
        </div>
    </section>
  )
}

export default NavBar