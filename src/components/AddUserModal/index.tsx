import { useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import Modal from '../Modal'

const AddUser = () => {
  const { isAddModalOpen, closeModals, handleAddUser, loading } = useUserStore()

  // Local state for form fields
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  })

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    handleAddUser(newUser) 
  }

  return (
    <Modal
      isOpen={isAddModalOpen}
      closeModal={closeModals}
      title='Add New User'
    >
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstname'
          required
          placeholder='First name'
          value={newUser.firstname}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='text'
          name='lastname'
          required
          placeholder='Last name'
          value={newUser.lastname}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='email'
          name='email'
          required
          placeholder='Email'
          value={newUser.email}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='text'
          name='phone'
          required
          placeholder='Phone'
          value={newUser.phone}
          onChange={handleChange}
          className='w-full border p-2 mb-8 rounded-md'
        />
        <button
          type='submit'
          className='bg-[#11497e] text-white px-4 py-2 rounded-md w-full mt-2'
        >
          {loading ? <span className='loader'></span> : <span>Add User</span>}
        </button>
      </form>
    </Modal>
  )
}

export default AddUser
