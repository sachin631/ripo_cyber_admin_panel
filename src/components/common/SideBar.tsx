'use client'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import WorkIcon from '@mui/icons-material/Work';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import PolicyIcon from '@mui/icons-material/Policy';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const SideBar = () => {
    const pathname = usePathname();
    console.log(pathname);
    const menu_items = [
        { path: '/protected/dashboard', label: 'DashBoard', icon: <DashboardIcon /> },
        { path: '/protected/aboutUs', label: 'About Us', icon: <InfoIcon /> },
        { path: '/protected/home', label: 'Home', icon: <HomeIcon /> },
        { path: '/protected/internShip', label: 'InternShip', icon: <LocalLibraryIcon /> },
        { path: '/protected/ourServices', label: 'Our Services', icon: <MiscellaneousServicesIcon /> },
        { path: '/protected/useCases', label: 'Use Cases', icon: <MiscellaneousServicesIcon /> },
        { path: '/protected/whyUs', label: 'Why Us', icon: <WorkHistoryIcon /> },
        { path: '/protected/workTogether', label: 'Work Together', icon: <GroupWorkIcon /> },
        { path: '/protected/yourCareer', label: 'Your Career', icon: <WorkIcon /> },
        { path: '/protected/users', label: 'users', icon: <PeopleIcon /> },
        { path: '/protected/Faq', label: 'Faq', icon: <QuizIcon /> },
        { path: '/protected/privacyPolicy', label: 'privacyPolicy', icon: <PolicyIcon /> },
        {path:'/protected/internShipForm',label:'internShipForm',icon:<InsertDriveFileIcon />},
        {path:'/protected/contactForm',label:'contactForm',icon:<InsertDriveFileIcon />}
    ]
    return (
        <>
            <section className='w-[100%]  font-[poppins] min-w-[200px] overflow-x-auto h-[85vh]'>
                <main>
                    <div className='flex flex-col gap-3'>
                        {
                            menu_items.map((item, index) => {
                                return (
                                    <Link href={item.path} key={index} >
                                        <div className={`flex justify-start gap-4 items-center px-2 py-2  cursor-pointer ${pathname === item.path ? 'bg-blue-500 text-white' : 'border-l-indigo-200'}`}>
                                            <span className=''>{item.icon}</span>
                                            <span className='text-xl'>{item.label}</span>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </main>
            </section>
        </>
    )
}

export default SideBar