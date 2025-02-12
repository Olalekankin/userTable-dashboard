import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import AddUser from '../AddUserModal'
import EditUser from '../EditUserModal'
import DeleteUser from '../DeleteUserModal'
import LoadingSkeleton from '../Loading'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

export default function UserTable() {
  const {
    users,
    searchQuery,
    fetchUsers,
    openEditModal,
    openDeleteModal,
    openAddModal,
    nextPage,
    prevPage,
    isEditModalOpen,
    isAddModalOpen,
    isDeleteModalOpen,
    currentPage,
    itemsPerPage,
    loading,
    error,
  } = useUserStore()

 useEffect(() => {
   if (!users.length) {
     fetchUsers()
   }
 }, [users.length, fetchUsers])


  const [openTooltip, setOpenTooltip] = useState<number | null>(null)


  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage)

  const filteredUsers = useMemo(() => {
    return users
      .slice() 
      .filter(
        (user) =>
          user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [users, searchQuery])

  // Apply pagination after filtering
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // handling the tooltip
  const toggleTooltip = useCallback((userId: number) => {
    setOpenTooltip((prev) => (prev === userId ? null : userId))
  }, [])





  return (
    <div className='w-full mt-8'>
      <div className='flex items-center space-x-3 justify-between'>
        <label>All {users.length}</label>
        <button
          onClick={openAddModal}
          className='flex px-5 rounded-2xl space-x-2 text-sm bg-[#11497e] cursor-pointer text-white py-2 items-center'
        >
          <span>Add User</span>
          <FaPlus />
        </button>
      </div>
      {/* If there is error, show error message */}
      {error && (
        <div className='w-full min-h-[50vh] flex justify-center items-center text-red-500 p-3 rounded mt-5'>
          <div>
            <div>
              <img
                src='asset/server.svg'
                loading='lazy'
                alt='server error image'
                className='size-56'
              />
            </div>
            <span className='mt-4 text-center text-lg font-medium'>{error}</span>
          </div>
        </div>
      )}
      {users.length > 0 && (
        <div>
          <table className='w-full mt-5 text-left text-sm'>
            <thead className='text-black font-semibold border-b border-vdblack'>
              <tr>
                <th scope='col' className='px-2 py-3 hidden md:table-cell'>
                  SN
                </th>
                <th scope='col' className='px-0 md:px-4 py-3'>
                  Name
                </th>
                <th scope='col' className='px-4 md:px-2 py-3'>
                  Email
                </th>
                <th
                  scope='col'
                  className='px-4 hidden md:table-cell md:px-2 py-3'
                >
                  Phone Number
                </th>
                <th scope='col' className='px-2 py-3'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='text-vdblack'>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <LoadingSkeleton key={index} />
                  ))
                : displayedUsers.map((user, index) => (
                    <tr key={user.id} className='border-b capitalize relative'>
                      <td className='px-2 py-2 hidden md:table-cell'>
                        {startIndex + index + 1}
                      </td>
                      <td className='px-0 md:px-4 py-2'>
                        {user.firstname} {user.lastname}
                      </td>
                      <td className='px-4 py-2 lowercase'>{user.email}</td>
                      <td className='px-4 py-2 hidden md:table-cell'>
                        {user.phone}
                      </td>
                      <td className='px-2 py-2 space-x-1 '>
                        <button
                          onClick={() => toggleTooltip(user.id)}
                          className='w-full flex md:hidden justify-center cursor-pointer'
                        >
                          <HiOutlineDotsHorizontal />
                        </button>
                        <div
                          className={`absolute md:static top-full right-0 md:right-auto z-20 border-gray-200 bg-gray-50 shadow-md border md:shadow-none md:border-none md:bg-transparent md:flex items-center md:space-x-2 transition-opacity duration-200 ${
                            openTooltip === user.id ? 'block' : 'hidden'
                          } md:block`}
                        >
                          <button
                            onClick={() => {
                              openEditModal(user)
                              setOpenTooltip(null)
                            }}
                            className='px-5 md:px-2 md:py-2 text-primary text-lg  cursor-pointer text-left'
                          >
                            <FaPen className='text-[#11497e] hidden md:inline' />
                            <span className='inline md:hidden text-left text-sm text-[#11497e]'>
                              Edit
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              openDeleteModal(user)
                              setOpenTooltip(null)
                            }}
                            className='px-2 md:py-2 text-primary text-lg cursor-pointer'
                          >
                            <FaTrash className='text-[#EC1C24] hidden md:inline' />
                            <span className='inline md:hidden text-sm text-[#ec1c24]'>
                              Delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className='w-full flex justify-end'>
            {/* Pagination */}
            <nav aria-label='Pagination' className='mt-4'>
              <ul className='flex items-center -space-x-px h-8 text-sm'>
                {/* Previous button */}
                <li>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className='sr-only'>Previous</span>
                    <svg
                      className='w-2.5 h-2.5 rtl:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 6 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 1 1 5l4 4'
                      />
                    </svg>
                  </button>
                </li>

                {/* Dynamic page */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  return (
                    <li key={pageNumber}>
                      <button
                        onClick={() =>
                          useUserStore.setState({ currentPage: pageNumber })
                        }
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                          currentPage === pageNumber
                            ? 'bg-gray-300 text-gray-900'
                            : ''
                        }`}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  )
                })}

                {/* Next Button */}
                <li>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                      currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <span className='sr-only'>Next</span>
                    <svg
                      className='w-2.5 h-2.5 rtl:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 6 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m1 9 4-4-4-4'
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Modals */}
      {isAddModalOpen && <AddUser />}

      {isEditModalOpen && <EditUser />}

      {isDeleteModalOpen && <DeleteUser />}
    </div>
  )
}
