import NavBar from '@/components/common/NavBar'
import SideBar from '@/components/common/SideBar'
import Protected from '@/protectionHooks/Protected'
import React from 'react'

const Layout = ({ children }: any) => {
    return (
        <>
            <Protected>
                <div>
                    <NavBar />
                </div>
                <div className="flex h-[70vh] gap-4 ">
                    <div className="w-[15%] ">
                        <SideBar />
                    </div>
                    <div className="w-[85%] xl:ml-4 md:ml-[10%] sm:ml-[20%] ml-[25%]">
                        {children}
                    </div>
                </div>
                {/* </body> */}
            </Protected>
        </>
    )
}

export default Layout