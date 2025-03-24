'use client'
import { useEffect } from 'react'
import useUserStore from '@/libs/userStore'
import getUserProfile from '@/libs/getUserProfile'
import { useSession } from 'next-auth/react'

export default function ProfileLoader() {
  const { data: session } = useSession()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.token) {
        const profile = await getUserProfile(session.user.token)
        setUser(profile)
      }
    }

    fetchProfile()
  }, [session, setUser])

  return null // no UI, just logic
}
