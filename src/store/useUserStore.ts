import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

// Define User type
interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
}

// API URL
const url = 'https://jsonplaceholder.org/users'

// Zustand store interface
interface UserStore {
  users: User[]
  searchQuery: string
  selectedUser: User | null
  isEditModalOpen: boolean
  isDeleteModalOpen: boolean
  isAddModalOpen: boolean
  currentPage: number
  itemsPerPage: number
  loading: boolean
  error: string | null
  setSearchQuery: (query: string) => void
  openAddModal: () => void
  openEditModal: (user: User) => void
  openDeleteModal: (user: User) => void
  closeModals: () => void
  fetchUsers: () => Promise<void>
  handleEditUser: (userId: number, updatedData: Partial<User>) => Promise<void>
  handleDeleteUser: (userId: number) => Promise<void>
  handleAddUser: (newUser: Omit<User, 'id'>) => Promise<void>
  paginatedUsers: () => User[]
  nextPage: () => void
  prevPage: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  searchQuery: '',
  selectedUser: null,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  isAddModalOpen: false,
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,

  setSearchQuery: (query) => set({ searchQuery: query }),

  openAddModal: () => set({ isAddModalOpen: true }),
  openEditModal: (user) => set({ selectedUser: user, isEditModalOpen: true }),
  openDeleteModal: (user) =>
    set({ selectedUser: user, isDeleteModalOpen: true }),

  closeModals: () =>
    set({
      selectedUser: null,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      isAddModalOpen: false,
      error: null,
    }),

  // Fetch users
  fetchUsers: async () => {
    set({ loading: true, error: null }) 
    try {
      const response = await axios.get<User[]>(url)
      set({ users: response.data, currentPage: 1, loading: false })
    } catch (error) {
      console.error('Failed to fetch users', error)
      set({ error: 'Failed to fetch users', loading: false })
      toast.error('Failed to fetch users')
    }
  },

  // Add new user
  handleAddUser: async (newUser) => {
    set({ loading: true, error: null }) 

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const response = await axios.post<User>(url, newUser)

      set((state) => ({
        users: [response.data, ...state.users],
        loading: false,
      }))

      toast.success('User added successfully')
      get().closeModals()
    } catch (error) {
      set({ loading: false, error: 'Failed to add user' })
      toast.error('Failed to add user')
    }
  },

  // Edit user
  handleEditUser: async (userId, updatedData) => {
    set({ loading: true, error: null }) 
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const response = await axios.put<User>(`${url}/${userId}`, updatedData)
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, ...response.data } : user
        ),
        loading: false,
      }))
      toast.success('User updated successfully')
      get().closeModals()
    } catch (error) {
      set({ error: 'Failed to update user', loading: false })
      toast.error('Failed to update user')
    }
  },

  // Delete user
  handleDeleteUser: async (userId) => {
    set({ loading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      await axios.delete(`${url}/${userId}`)
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
        loading: false,
      }))
      toast.success('User deleted successfully')
      get().closeModals()
    } catch (error) {
      set({ error: 'Failed to delete user', loading: false })
      toast.error('Failed to delete user')
    }
  },

  // Get paginated users
  paginatedUsers: () => {
    const { users, currentPage, itemsPerPage } = get()
    const startIndex = (currentPage - 1) * itemsPerPage
    return users.slice(startIndex, startIndex + itemsPerPage)
  },

  // Handle next page
  nextPage: () => {
    set((state) => {
      const totalPages = Math.ceil(state.users.length / state.itemsPerPage)
      return {
        currentPage:
          state.currentPage < totalPages
            ? state.currentPage + 1
            : state.currentPage,
      }
    })
  },

  // Handle previous page
  prevPage: () => {
    set((state) => ({
      currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1,
    }))
  },
}))
