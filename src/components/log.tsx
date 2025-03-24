"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { Loader2, AlertCircle } from 'lucide-react';
import fetchAdminLogs from '@/libs/fetchAdminLogs';
import { useSession } from 'next-auth/react';

type Campground = {
  _id: string;
  name: string;
  province: string;
  telephone: string;
  id: string;
};

type Reserve = {
  _id: string;
  rDate: string;
  user: string;
  campground: Campground;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Log = {
  _id: string;
  action: string;
  user: User;
  reserve: Reserve;
  timestamp: string;
};

type LogData = {
  success: boolean;
  count: number;
  data: Log[];
};

type AdminLogsProps = {
  currentUserRole: string;
};

const AdminLogs: React.FC<AdminLogsProps> = ({ currentUserRole }) => {
    const { data: session } = useSession(); // Get session
    const [logs, setLogs] = useState<LogData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchLogs = async () => {
        try {
          if (!session?.user?.token) throw new Error('No token found');
  
          const data = await fetchAdminLogs(session.user.token); // Pass token
          setLogs(data);
        } catch (err: any) {
          console.error(err);
          setError(err.message || JSON.stringify(err));
        } finally {
          setLoading(false);
        }
      };
  
      if (currentUserRole === 'admin') {
        fetchLogs();
      }
    }, [currentUserRole, session]);

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center gap-2">
        <Loader2 className="animate-spin" />
        <span>Loading logs...</span>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-red-600">
        <AlertCircle className="inline mr-2" />
        {error}
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Activity Logs ({logs?.count})</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Campground</TableHead>
            <TableHead>Reserve Date</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
          logs?.data.map((log) => (
            <TableRow key={log._id}>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`capitalize 
                    ${log.action.toLowerCase() === 'create' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
                    ${log.action.toLowerCase() === 'update' ? 'bg-blue-100 text-blue-800 border-blue-300' : ''}
                    ${log.action.toLowerCase() === 'delete' ? 'bg-red-100 text-red-800 border-red-300' : ''}
                  `}
                >
                  {log.action.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">{log.user.name}</div>
                <div className="text-sm text-gray-500">{log.user.email}</div>
              </TableCell>
              <TableCell>
                {log.reserve?.campground?.name ?? "---"}
              </TableCell>
              <TableCell>
                {log.reserve?.rDate ? format(new Date(log.reserve.rDate), 'PPpp') : "---"}
              </TableCell>
              <TableCell>{format(new Date(log.timestamp), 'PPpp')}</TableCell>
              <TableCell>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center gap-1 text-blue-600 hover:underline">
                      <ChevronDown className="h-4 w-4" /> View
                    </button>
                  </CollapsibleTrigger>
                  {log.reserve ? (
                    <CollapsibleContent className="mt-2 bg-gray-50 p-2 rounded">
                      <p><strong>Campground:</strong> {log.reserve.campground.name}</p>
                      <p><strong>Province:</strong> {log.reserve.campground.province}</p>
                      <p><strong>Telephone:</strong> {log.reserve.campground.telephone}</p>
                      <p><strong>Reserve ID:</strong> {log.reserve._id}</p>
                      <p><strong>Reserve Date:</strong> {format(new Date(log.reserve.rDate), 'PPpp')}</p>
                    </CollapsibleContent>
                  ) : (
                    <CollapsibleContent className="mt-2 bg-gray-50 p-2 rounded text-gray-500 italic">
                      No reservation details available.
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </TableCell>
            </TableRow>
           ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AdminLogs;
