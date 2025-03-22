export default async function getCampground(id:string) {
    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds/${id}`)

    if(!respone.ok) {
        throw new Error('Failed to fetch cars');
    }
    
    return await respone.json()
}