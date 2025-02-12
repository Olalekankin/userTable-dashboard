import { ReactNode, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  title: string
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  title,
  children,
}) => {
  if (!isOpen) return null 
// Close modal on the press of escape key
   useEffect(() => {
     const handleKeyDown = (event: KeyboardEvent) => {
       if (event.key === 'Escape') closeModal()
     }
     document.addEventListener('keydown', handleKeyDown)
     return () => document.removeEventListener('keydown', handleKeyDown)
   }, [closeModal])

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-[#00000063]'>
      <div className='bg-white w-full max-w-sm md:max-w-md p-6 rounded-lg shadow-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <button
            onClick={closeModal}
            className='text-gray-600 hover:text-gray-900'
          >
            <FaTimes/>
          </button>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
