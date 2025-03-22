export default async function getVenues() {

    await new Promise((resolve)=> setTimeout(resolve,300))

    const response  = await fetch('https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues')

    if (!response.ok) {
        throw new Error('Failed to fetch venues');
    }

    return response.json()
}