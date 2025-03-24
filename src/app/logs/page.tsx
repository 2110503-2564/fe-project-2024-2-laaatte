'use client'
import { useSession } from 'next-auth/react';
import AdminLogs from "@/components/log";
import useUserStore from '@/libs/userStore';
import { use } from 'react';

export default function LogsPage() {
  const { data: session } = useSession();
  const user = useUserStore((state) => state.user)
  // console.log(user?.data)

  // If the session does not exist or the user doesn't have a role, handle it gracefully
  if (user?.data.role !== 'admin' ) {
    return (
      <div className="container mx-auto py-8">
        <p>You do not have access to view logs.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <AdminLogs currentUserRole={user.data.role} />
    </div>
  );
}
