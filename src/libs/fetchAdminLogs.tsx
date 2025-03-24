export default async function fetchAdminLogs(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/logs`, {
        method : "GET",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      cache: "no-store"
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch logs:', errorText);
      throw new Error(`Failed to fetch logs: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    if (!data.success) {
      console.error('API responded with error:', data);
      throw new Error(data.msg || 'Failed to load logs');
    }
  
    return data;
  }