'use client'

import { useSession } from 'next-auth/react';
import AdminLogs from "@/components/log";

export default function LogsPage() {
  const { data: session, status } = useSession();

  // Ensure the session is loading or available
  if (status === 'loading') {
    return (
      <div className="container mx-auto py-8">
        <p>Loading...</p>
      </div>
    );
  }

  const currentUserRole = session?.user?.role; // Retrieve the user's role from the session
  console.log(currentUserRole)

  // If the session does not exist or the user doesn't have a role, handle it gracefully
  if (!currentUserRole) {
    return (
      <div className="container mx-auto py-8">
        <p>You do not have access to view logs.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <AdminLogs currentUserRole={currentUserRole} />
    </div>
  );
}
