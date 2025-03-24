'use client'
import { useEffect } from 'react'
import useUserStore from '@/libs/userStore'
import getUserProfile from '@/libs/getUserProfile'
import { useSession } from 'next-auth/react'

export default function ProfileLoader() {
  const { data: session } = useSession()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    if (!session?.user?.token) return

    getUserProfile(session.user.token)
      .then((profile) => setUser(profile))
      .catch(() => {}) // silently fail

  // run only once after mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  return null // no UI, just logic
}
