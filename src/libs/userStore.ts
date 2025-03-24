// libs/userStore.ts
import { create } from 'zustand'

type User = {
  _id: string
  name: string
  email: string
  role: string
  telephone: string
  createdAt: string
}

type UserStore = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useUserStore
