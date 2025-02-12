import { Toaster } from "react-hot-toast"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import UserTable from "./components/UserTable"
import {Helmet} from "react-helmet"


function App() {

  return (
    <>
      <Helmet>
        <title>User - IBCSCorps</title>
        <meta name='description' content='Search for users' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>

      <Toaster />
      <div className='flex min-h-screen w-full bg-white'>
        <div className='h-full hidden lg:block fixed w-max'>
          <Sidebar />
        </div>
        <div className='flex flex-col w-full lg:ml-56 p-4 md:p-6'>
          <Topbar />
          <div className=''>
            <UserTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
