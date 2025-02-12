import { useUserStore } from '../../store/useUserStore'
import Modal from '../Modal'

const DeleteUser = () => {
  const { isDeleteModalOpen, selectedUser, closeModals, handleDeleteUser, loading } = useUserStore()


   const handleDelete = () => {
     if (selectedUser) {
       handleDeleteUser(selectedUser.id)
     }
   }

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      closeModal={closeModals}
      title='Delete User'
    >
      <p className='flex items-center space-x-1'>
        <span>Are you sure you want to delete</span>
        <strong className='flex items-center'>
          {selectedUser?.firstname} {selectedUser?.lastname} ?
        </strong>
      </p>
      <div className='flex justify-end gap-2 mt-4'>
        <button
          onClick={handleDelete}
          disabled={loading}
          className='w-full px-4 py-2 bg-[#EC1C24] flex items-center justify-center space-x-2 text-white rounded-md'
        >
          {loading ? <span className='loader'></span> : <span>Delete</span>}
        </button>
      </div>
    </Modal>
  )
}

export default DeleteUser
