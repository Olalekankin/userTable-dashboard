import { useCallback, useState } from 'react'
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

  // Handle form input change 
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Handle form submission 
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!loading) {
        handleAddUser(newUser)
      }
    },
    [handleAddUser, newUser, loading]
  )

  return (
    <Modal
      isOpen={isAddModalOpen}
      closeModal={closeModals}
      title='Add New User'
    >
      <form onSubmit={handleSubmit}>
        {['firstname', 'lastname', 'email', 'phone'].map((field) => (
          <input
            key={field}
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            required
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newUser[field as keyof typeof newUser]}
            onChange={handleChange}
            className='w-full border p-2 mb-4 rounded-md'
          />
        ))}
        <button
          type='submit'
          disabled={loading}
          className={`bg-[#11497e] text-white px-4 py-2 rounded-md w-full mt-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? <span className='loader'></span> : 'Add User'}
        </button>
      </form>
    </Modal>
  )
}

export default AddUser
