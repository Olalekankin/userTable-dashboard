import { useState, useCallback, FormEvent } from 'react'
import { useUserStore } from '../../store/useUserStore'
import Modal from '../Modal'

const EditUser = () => {
  const {
    isEditModalOpen,
    selectedUser,
    closeModals,
    handleEditUser,
    loading,
  } = useUserStore()

  const [formData, setFormData] = useState(() => ({
    firstname: selectedUser?.firstname || '',
    lastname: selectedUser?.lastname || '',
    email: selectedUser?.email || '',
    phone: selectedUser?.phone || '',
  }))

  // Handle input form change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const isUnchanged = JSON.stringify(formData) === JSON.stringify(selectedUser)

  // handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (selectedUser && !isUnchanged) {
        await handleEditUser(selectedUser.id, formData)
        closeModals()
      }
    },
    [selectedUser, formData, isUnchanged, handleEditUser, closeModals]
  )

  return (
    <Modal isOpen={isEditModalOpen} closeModal={closeModals} title='Edit User'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstname'
          required
          value={formData.firstname}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='text'
          name='lastname'
          required
          value={formData.lastname}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='email'
          name='email'
          required
          value={formData.email}
          onChange={handleChange}
          className='w-full border p-2 mb-4 rounded-md'
        />
        <input
          type='text'
          name='phone'
          required
          value={formData.phone}
          onChange={handleChange}
          className='w-full border p-2 mb-8 rounded-md'
        />
        <button
          type='submit'
          disabled={loading || isUnchanged}
          className={`bg-[#11497e] text-white flex space-x-2 items-center justify-center px-4 py-2 rounded-md w-full mt-2 ${
            loading || isUnchanged ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {loading ? <span className='loader'></span> : 'Save'}
        </button>
      </form>
    </Modal>
  )
}

export default EditUser
