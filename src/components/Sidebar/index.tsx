import { RiFileUserFill } from "react-icons/ri";

export default function Sidebar () {

 return (
   <>
     <div className='fixed top-0 left-0 lg:w-56  bg-[#3e4556] hidden lg:block lg:h-screen'>
       <div className='flex flex-col h-full'>
         {/* Brand logo */}
         <div className='px-4 py-6 flex w-full items-center h-max bg-[#9c9c9c]'>
           <div className='flex items-center w-full px-3 pb-3 mx-auto'>
             <img src='./asset/logo.svg' alt='logo' className='h-12' />
           </div>
         </div>

         {/* SIDEBAR LINKS */}
         <div className='py-2 mt-6 pr-6 h-[calc(100vh-13rem)] overflow-y-auto tray'>
           <div className='flex flex-col'>
             <ul className='space-y-2 font-normal text-base'>
               <li className='text-grey bg-[#EC1C24] text-white text-lg rounded-r-2xl py-2 px-3 w-full flex items-center space-x-2'>
                 <RiFileUserFill className='text-lg' />
                 <span>User</span>
               </li>
             </ul>
           </div>
         </div>

         {/* PROFILE COMPONENT */}
         <div className='absolute bottom-0 -translate-x-6 w-full z-50 h-28'></div>
       </div>
     </div>
   </>
 )
}