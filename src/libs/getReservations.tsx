export default async function getReservation(token:string) {

    // await new Promise((resolve)=> setTimeout(resolve,300))

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reserves`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store"
    });

    if(!response.ok) {
        throw new Error('Failed to fetch reserve');
    }
    
    return await response.json()
}