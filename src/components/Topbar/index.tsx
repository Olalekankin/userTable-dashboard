import { FaUser } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { useUserStore } from '../../store/useUserStore'

export default function Topbar() {
  const { searchQuery, setSearchQuery } = useUserStore()

  return (
    <div className='px-6 flex flex-col md:flex-row w-full md:items-center justify-between mt-6 space-x-6 space-y-3 md:space-y-0'>
      <h2 className='font-semibold text-xl text-black'>User List</h2>
      <div className='flex-grow'>
        <form onSubmit={(e) => e.preventDefault()} className='relative w-full'>
          {/* Input Field */}
          <input
            type='text'
            placeholder='Search users...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-10 pr-4 py-2 w-full border border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3E4556]'
          />
          {/* Search Icon */}
          <button
            type='submit'
            className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
          >
            <IoSearch />
          </button>
        </form>
      </div>
      <div className='hidden md:inline'>
        <FaUser className='text-2xl' />
      </div>
    </div>
  )
}
