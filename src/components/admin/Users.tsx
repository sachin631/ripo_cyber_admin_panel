import React from 'react'
import BasicTable from '../custom/Table'

const Users = () => {
  return (
    <>
    <div>
        <h1 className='text-2xl font-bold'>Users</h1>
    </div>
    <div className='overflow-x-scroll'>
        <BasicTable/>
    </div>
    </>
  )
}

export default Users