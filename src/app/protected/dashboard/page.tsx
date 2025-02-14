import DashBoard from '@/components/admin/DashBoard'
import Protected from '@/protectionHooks/Protected'
import React from 'react'

const page = () => {
  return (
    <Protected>
      <div><DashBoard /></div>
    </Protected>
  )
}

export default page