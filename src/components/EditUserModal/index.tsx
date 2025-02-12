import { useState, useEffect, FormEvent } from 'react'
import { useUserStore } from '../../store/useUserStore'
import Modal from '../Modal'

const EditUser = () => {
  const { isEditModalOpen, selectedUser, closeModals, handleEditUser, loading } =
    useUserStore()

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        firstname: selectedUser.firstname || '',
        lastname: selectedUser.lastname || '',
        email: selectedUser.email || '',
        phone: selectedUser.phone || '',
      })
    }
  }, [selectedUser])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (selectedUser) {
      await handleEditUser(selectedUser.id, formData)
      closeModals()
    }
  }

  return (
    <Modal isOpen={isEditModalOpen} closeModal={closeModals} title='Edit User'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstname'
          value={formData.firstname}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='text'
          name='lastname'
          value={formData.lastname}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='text'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          className='w-full border p-2 mb-8 rounded-md'
        />
        <button
          type='submit'
          className='bg-[#11497e] text-white flex space-x-2 items-center justify-center px-4 py-2 rounded-md w-full mt-2'
          disabled={loading}
        >
          {loading ? <span className='loader'></span> : <span>Save</span>}
        </button>
      </form>
    </Modal>
  )
}

export default EditUser
