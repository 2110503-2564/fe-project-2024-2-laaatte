export default async function getVenue(vid:string) {

    const response  = await fetch(`https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues/${vid}`)

    if (!response.ok) {
        throw new Error('Failed to fetch venues');
    }

    return response.json()
}