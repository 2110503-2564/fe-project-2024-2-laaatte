export default async function deleteReservation(reserve_id:string, token:string) {
    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/reserves/${reserve_id}`, {
        method : "DELETE",
        headers: {
            authorization : `Bearer ${token}`
        }
    })

    console.log(respone)

    if (!respone.ok)
        throw new Error('Failed to delete reservation')

    return respone.json()
}   